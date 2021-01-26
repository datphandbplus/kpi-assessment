import {ErrorConstants} from "../interfaces";
import {Common} from "../lib/common";

const SequeLize = require('sequelize');
const Op = SequeLize.Op;
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);

class EmployeeService {
    private channelId = '';
    private sequelize = new SequeLize(DB_CONFIG.path1, {
        operatorsAliases: false,
        logging: false,
        define: {
            timestamps: false
        }
    });

    private StaffAssessemnt: any;
    private Survey: any;
    private HREmployee: any;

    constructor() {
        this.channelId = 'dbplus';
        this.StaffAssessemnt = this.sequelize.define('staff_assessment', {
            employee_id: SequeLize.INTEGER,
            assessment_year: SequeLize.INTEGER,
            survey_id: SequeLize.INTEGER,
            assessments: SequeLize.JSON
        });
        this.Survey = this.sequelize.define('survey', {
            name: { type: SequeLize.STRING(255), allowNull: false },
            description: { type: SequeLize.TEXT, allowNull: false}
        });
        this.HREmployee = this.sequelize.define('hr_employee', {
            department_id: {type: SequeLize.INTEGER, allowNull: false},
            email: { type: SequeLize.STRING, allowNull: false},
            full_name: { type: SequeLize.STRING, allowNull: false},
            position: { type: SequeLize.STRING, allowNull: false},
            is_active: { type: SequeLize.INTEGER, allowNull: false}
        });
    }

    getAllEmployees = async (filter, search, offset, limit, sort, order) => {
        sort = (sort === 'id') ? 'emp.id' : sort;
        let queryCount = `
                        SELECT 
                            count(distinct emp.id) as total
                        FROM dbplus_kpi_lezo.hr_employees as emp
                        inner join dbplus_kpi_lezo.hr_departments as dp on dp.id = emp.department_id`;
        let query = `
                        SELECT 
                            emp.id as employee_id, emp.full_name, emp.email, emp.position, emp.is_active, dp.id as department_id, dp.name as department_name
                        FROM dbplus_kpi_lezo.hr_employees as emp
                        inner join dbplus_kpi_lezo.hr_departments as dp on dp.id = emp.department_id`;
        if (search) {
            queryCount += ` where (email like "%${search}%" or full_name like "%${search}%" or dp.name like "%${search}%")`;
            query += ` where (email like "%${search}%" or full_name like "%${search}%" or dp.name like "%${search}%")`;if (filter) {
                const filterObject = filter.split(':');
                queryCount += ' and ' + filterObject[0] + '=' + filterObject[1];
                query += ' and ' + filterObject[0] + '=' + filterObject[1];
            }
        } else {
            if (filter) {
                const filterObject = filter.split(':');
                queryCount += ' where ' + filterObject[0] + '=' + filterObject[1];
                query += ' where ' + filterObject[0] + '=' + filterObject[1];
            }
        }
        queryCount += ` order by ${sort} ${order}`;
        query += ` order by ${sort} ${order} limit ${limit} offset ${ limit * (offset - 1)}`;
        return Promise.all(
            [
                this.sequelize.query(queryCount),
                this.sequelize.query(query)
            ]
        );
    }

    getDepartments = async () => {
        const query = `
                        SELECT dp.id, dp.name
                        FROM dbplus_kpi_lezo.hr_departments as dp`;
        return this.sequelize.query(query);
    }

    getAllEmployeesAssessment = async (userData, filter, search, offset, limit, sort, order) => {
        if (DB_CONFIG.admin_list.indexOf(userData['email']) !== -1) {
            userData['roles'] = ['admin'];
        } else {
            userData['roles'] = ['user'];
        }
        sort = (sort === 'id') ? 'emp.id' : sort;
        let queryCount = `
                        SELECT 
                            count(distinct emp.id) as total
                        FROM dbplus_kpi_lezo.staff_assessments as sa
                        right join dbplus_kpi_lezo.hr_employees as emp on emp.id = sa.employee_id
                        inner join dbplus_kpi_lezo.hr_departments as dp on dp.id = emp.department_id`;
        let query = `
                        SELECT 
                            emp.id as employee_id, emp.full_name, emp.email, emp.position, dp.id as department_id, dp.name as department_name, sa.assessment_year
                        FROM dbplus_kpi_lezo.staff_assessments as sa
                        right join dbplus_kpi_lezo.hr_employees as emp on emp.id = sa.employee_id
                        inner join dbplus_kpi_lezo.hr_departments as dp on dp.id = emp.department_id`;
        let query3 = `SELECT * FROM dbplus_kpi_lezo.surveys order by id`;
        if (search) {
            queryCount += ` where (email like "%${search}%" or full_name like "%${search}%" or position like "%${search}%" or dp.name like "%${search}%")`;
            query += ` where (email like "%${search}%" or full_name like "%${search}%" or position like "%${search}%" or dp.name like "%${search}%")`;
            if (filter) {
                const filterObject = filter.split(':');
                queryCount += ' and ' + filterObject[0] + '=' + filterObject[1];
                query += ' and ' + filterObject[0] + '=' + filterObject[1];
            }
        } else {
            if (filter) {
                const filterObject = filter.split(':');
                queryCount += ' where ' + filterObject[0] + '=' + filterObject[1];
                query += ' where ' + filterObject[0] + '=' + filterObject[1];
            }
        }

        queryCount += ` order by ${sort} ${order}`;
        query += ` group by emp.id, emp.full_name, emp.email, emp.position, dp.id, dp.name, sa.assessment_year order by ${sort} ${order} limit ${limit} offset ${ limit * (offset - 1)}`;
        const res1 = await this.sequelize.query(queryCount);
        const res2 = await this.sequelize.query(query);
        const res3 = await this.sequelize.query(query3);
        const total = (res1 && res1[0] && res1[0][0] && res1[0][0].total) ? +res1[0][0].total : 0;
        const employeesList: any[] = (res2 && res2[0]) ? res2[0] : [];
        const surveysList: any[] = (res3 && res3[0]) ? res3[0] : [];
        if (employeesList.length) {
            for (const emp of employeesList) {
                let queryEmpCounts = `select count(distinct id) as total from dbplus_kpi_lezo.hr_employees where department_id=${emp.department_id}`;
                let queryEmps = `select * from dbplus_kpi_lezo.hr_employees where department_id=${emp.department_id} order by id`;
                const res4 = await this.sequelize.query(queryEmpCounts);
                const res5 = await this.sequelize.query(queryEmps);
                const totalEmp = (res4 && res4[0] && res4[0][0] && res4[0][0].total) ? +res4[0][0].total : 0;
                const empsList: any[] = (res5 && res5[0]) ? res5[0] : [];
                emp.totalEmployees = totalEmp;
                emp.totalSurveys = surveysList.length;
                emp.employees = [];
                if (empsList.length) {
                    let empIndex: number = 0;
                    for (const empSub of empsList) {
                        const item: any = {
                            title: Common.convertFullname(empSub.full_name),
                            id: empSub.id,
                            surveys: []
                        };
                        for (const survey of surveysList) {
                            if (empSub.id === emp.employee_id) {
                                item.surveys.push({
                                    survey: survey.name,
                                    score: 0,
                                    comment: ''
                                });
                            } else {
                                let queryAssessment = `select * from dbplus_kpi_lezo.staff_assessments where employee_id=${emp.employee_id} and survey_id=${survey.id}`;
                                const res6 = await this.sequelize.query(queryAssessment, { raw: true });
                                let data: any[] = [];
                                if (res6 && res6[0] && res6[0][0] && res6[0][0].assessments) {
                                    try {
                                        data = JSON.parse(JSON.parse(JSON.stringify(res6[0][0].assessments.replace(/\r?\n|\r/g, 'xuonghang'))));
                                    } catch (e) {}
                                    if (data.length) {
                                        data.forEach(d => {
                                           d.comment = d.comment.replace(/'xuonghang'/g, '\n');
                                        });
                                    }
                                }
                                if (data.length < 1) {
                                    item.surveys.push({
                                        survey: survey.name,
                                        score: 0,
                                        comment: ''
                                    });
                                } else {
                                    const findData: any = data.find((ss: any) => ss.by === empSub.id);
                                    if (findData) {
                                        item.surveys.push({
                                            survey: survey.name,
                                            score: +findData.score,
                                            comment: findData.comment
                                        });
                                    } else {
                                        item.surveys.push({
                                            survey: survey.name,
                                            score: 0,
                                            comment: ''
                                        });
                                    }
                                }
                            }
                        }
                        emp.employees.push(item);
                        empIndex++;
                    }
                }
            }
        }
        return Promise.all([total, employeesList]);
    }

    getAssessmentSurvey = async (userData, assessmentYear) => {
        const departmentId = userData.department_id;
        const userId = userData.id;
        const query1 = `
                        SELECT distinct
                            dp.id as department_id, dp.name as department_name, de.id as employee_id, 
                            de.full_name as full_name, de.position
                        FROM dbplus_kpi_lezo.hr_employees as de
                        INNER JOIN dbplus_kpi_lezo.hr_departments as dp on dp.id = de.department_id
                        WHERE dp.id=${departmentId}`;
        const query2 = `SELECT * FROM dbplus_kpi_lezo.surveys order by id`;
        const queryEmps = `select * from dbplus_kpi_lezo.hr_employees where department_id=${departmentId} and id <> ${userId} order by id`;
        const res1 = await this.sequelize.query(query1);
        const res2 = await this.sequelize.query(query2);
        const res3 = await this.sequelize.query(queryEmps);
        const infoList: any[] = (res1 && res1[0]) ? res1[0] : [];
        const surveysList: any[] = (res2 && res2[0]) ? res2[0] : [];
        const empsList: any[] = (res3 && res3[0]) ? res3[0] : [];
        if (infoList.length) {
            for (const info of infoList) {
                info.assessment_year = assessmentYear;
                info.assessments = [];
                info.full_name = Common.convertFullname(userData.full_name);
                info.position = userData.position;
                for (const survey of surveysList) {
                    const item: any = {
                        id: survey.id,
                        name: survey.name,
                        description: survey.description,
                        users: []
                    };
                    for (const emp of empsList) {
                        let queryAssessment = `select * from dbplus_kpi_lezo.staff_assessments where employee_id=${emp.id} and survey_id=${survey.id} and assessment_year=${assessmentYear} and assessments like '%"by":${userId}%'`;
                        const res4 = await this.sequelize.query(queryAssessment);
                        let data: any[] = [];
                        if (res4 && res4[0] && res4[0][0] && res4[0][0].assessments) {
                            try {
                                data = JSON.parse(JSON.parse(JSON.stringify(res4[0][0].assessments.replace(/\r?\n|\r/g, 'xuonghang'))));
                            } catch (e) {}
                            if (data.length) {
                                data.forEach(d => {
                                    d.comment = d.comment.replace(/'xuonghang'/g, '\n');
                                });
                            }
                        }
                        if (data.length) {
                            const recordItem: any[] = data.filter((da: any) => da.by === userId);
                            if (recordItem.length) {
                                item.users.push({
                                    by: emp.id,
                                    name: Common.convertFullname(emp.full_name),
                                    score: +recordItem[0].score || 0,
                                    comment: recordItem[0].comment || '',
                                    has_assessment: true
                                });
                            } else {
                                item.users.push({
                                    by: emp.id,
                                    name: Common.convertFullname(emp.full_name),
                                    score: 0,
                                    comment: '',
                                    has_assessment: false
                                });
                            }
                        } else {
                            item.users.push({
                                by: emp.id,
                                name: Common.convertFullname(emp.full_name),
                                score: 0,
                                comment: '',
                                has_assessment: false
                            });
                        }
                    }
                    info.assessments.push(item);
                }
            }
        }
        return Promise.resolve(infoList);
    }

    getAssessmentServeyByUserId = async (userId, assessmentYear) => {
        const resEmp = await this.sequelize.query('select * from dbplus_kpi_lezo.hr_employees where id=' + userId);
        const departmentId = +resEmp[0][0].department_id;
        const position = resEmp[0][0].position;
        const fullname = Common.convertFullname(resEmp[0][0].full_name);
        const query1 = `
                        SELECT distinct
                            dp.id as department_id, dp.name as department_name, de.id as employee_id, 
                            de.full_name as full_name, de.position
                        FROM dbplus_kpi_lezo.hr_employees as de
                        INNER JOIN dbplus_kpi_lezo.hr_departments as dp on dp.id = de.department_id
                        WHERE dp.id=${departmentId}`;
        const query2 = `SELECT * FROM dbplus_kpi_lezo.surveys order by id`;
        const queryEmps = `select * from dbplus_kpi_lezo.hr_employees where department_id=${departmentId} and id <> ${userId} order by id`;
        const res1 = await this.sequelize.query(query1);
        const res2 = await this.sequelize.query(query2);
        const res3 = await this.sequelize.query(queryEmps);
        const infoList: any[] = (res1 && res1[0]) ? res1[0] : [];
        const surveysList: any[] = (res2 && res2[0]) ? res2[0] : [];
        const empsList: any[] = (res3 && res3[0]) ? res3[0] : [];
        if (infoList.length) {
            for (const info of infoList) {
                info.assessment_year = assessmentYear;
                info.assessments = [];
                info.full_name = fullname;
                info.position = position;
                for (const survey of surveysList) {
                    const item: any = {
                        id: survey.id,
                        name: survey.name,
                        description: survey.description,
                        users: []
                    };
                    for (const emp of empsList) {
                        let queryAssessment = `select * from dbplus_kpi_lezo.staff_assessments where employee_id=${emp.id} and survey_id=${survey.id} and assessment_year=${assessmentYear} and assessments like '%"by":${userId}%'`;
                        const res4 = await this.sequelize.query(queryAssessment);
                        let data: any[] = (res4 && res4[0] && res4[0].length && res4[0][0] && res4[0][0].assessments) ? JSON.parse(res4[0][0].assessments) : [];
                        if (data.length) {
                            const recordItem: any[] = data.filter((da: any) => da.by === userId);
                            if (recordItem.length) {
                                item.users.push({
                                    by: emp.id,
                                    name: Common.convertFullname(emp.full_name),
                                    score: +recordItem[0].score || 0,
                                    comment: recordItem[0].comment || '',
                                    has_assessment: true
                                });
                            } else {
                                item.users.push({
                                    by: emp.id,
                                    name: Common.convertFullname(emp.full_name),
                                    score: 0,
                                    comment: '',
                                    has_assessment: false
                                });
                            }
                        } else {
                            item.users.push({
                                by: emp.id,
                                name: Common.convertFullname(emp.full_name),
                                score: 0,
                                comment: '',
                                has_assessment: false
                            });
                        }
                    }
                    info.assessments.push(item);
                }
            }
        }
        return Promise.resolve(infoList);
    }

    getSurveys = async (userData, search, offset, limit, sort, order) => {
        let queryCount = `select count(*) as total
                            FROM dbplus_kpi_lezo.surveys`;
        let query = `select *
                            FROM dbplus_kpi_lezo.surveys`;
        if (search) {
            queryCount += ` where name like '%${search}%' or description like  N'%${search}%'`;
            query += ` where name like '%${search}%' or description like N'%${search}%'`;
        }
        queryCount += ` order by ${sort} ${order}`;
        query += ` order by ${sort} ${order} limit ${limit} offset ${ limit * (offset - 1)}`;
        return Promise.all(
            [
                this.sequelize.query(queryCount),
                this.sequelize.query(query)
            ]
        );
    }

    getAssessmentSurveySubmit = async (userData, formData) => {
        const userId = userData.id || 0;
        const that = this;
        if (formData && formData.length) {
            const sendCreateData: any[] = [];
            const sendUpdateQuery: any[] = [];
            const sendUpdateData: any[] = [];
            try {
                for (let i = 0; i < formData.length; i++) {
                    const form: any = formData[i];
                    const res1 = await this.StaffAssessemnt.findOne({
                        where: {
                            employee_id: form.employee_id,
                            survey_id: form.survey_id,
                            assessment_year: form.assessment_year
                        }
                    });
                    if (res1) {

                        const assData: any = res1['dataValues'];
                        const currAss: any[] = assData.assessments ? JSON.parse(assData.assessments) : [];
                        if (currAss.length > 0) {
                            if (currAss.filter((as: any) => as.by === +userId).length < 1) {
                                currAss.push(form.assessments[0]);
                            }
                            sendUpdateData.push({
                                assessments: currAss
                            });
                        } else {
                            sendUpdateData.push({
                                assessments: form.assessments
                            });
                        }
                        sendUpdateQuery.push({
                            employee_id: form.employee_id,
                            survey_id: form.survey_id,
                            assessment_year: form.assessment_year
                        })
                    } else {
                        sendCreateData.push({
                            employee_id: form.employee_id,
                            survey_id: form.survey_id,
                            assessment_year: form.assessment_year,
                            assessments: form.assessments
                        });
                    }
                }
                const promises = [];
                if (sendCreateData.length) {
                    sendCreateData.forEach((sd: any) => {
                        const query = 'insert into dbplus_kpi_lezo.staff_assessments(employee_id,assessment_year,survey_id,assessments) values(' +
                            sd.employee_id + ',' + sd.assessment_year + ',' + sd.survey_id + ',"' +
                            ((sd.assessments && sd.assessments.length) ? JSON.stringify(sd.assessments).replace(/"/g, '\\"') : '') +
                            '")';
                        promises.push(
                            that.sequelize.query(query)
                        );
                    });
                }
                if (sendUpdateData.length) {
                    sendUpdateData.forEach((sd: any, ind: number) => {
                        const query = 'update dbplus_kpi_lezo.staff_assessments set assessments=' + '"' +
                            ((sd.assessments && sd.assessments.length) ? JSON.stringify(sd.assessments).replace(/"/g, '\\"') : '') +
                            '" where employee_id=' + sendUpdateQuery[ind].employee_id + ' and assessment_year=' + sendUpdateQuery[ind].assessment_year + ' and survey_id=' + sendUpdateQuery[ind].survey_id;
                        promises.push(
                            that.sequelize.query(query)
                        );
                    });
                }
                if (promises.length) {
                    Promise.all(promises);
                }
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.resolve({});
    }

    // Get employee profile
    getEmployeeById = async (userId) => {
        return new Promise(async (resolve, reject) => {
            this.HREmployee.findByPk(userId).then(res => {
                if (res) {
                    res['dataValues']['password'] =undefined;
                    resolve(res);
                } else {
                    reject(ErrorConstants.EMPLOYEE_NOT_FOUND);
                }
            });
        });
    }

    // Get employee profile
    updateEmployee = async (employeeId, full_name, email, position, department_id) => {
        return new Promise(async (resolve, reject) => {
            const query = `update dbplus_kpi_lezo.hr_employees set full_name='${Common.convertFullname(full_name)}',  email='${email}', position='${position}', department_id='${department_id}' where id=${employeeId}`;
            this.sequelize.query(query).then(res => {
                if (res) {
                    resolve('Update employee successful');
                } else {
                    reject(ErrorConstants.EMPLOYEE_UPDATE_FAILED);
                }
            });
        });
    }

    // Get employee profile
    updateSurvey = async (surveyId, surveyName, surveyDescription) => {
        return new Promise(async (resolve, reject) => {
            const query = `update dbplus_kpi_lezo.surveys set name='${surveyName}',  description='${surveyDescription}' where id=${surveyId}`;
            this.sequelize.query(query).then(res => {
                if (res) {
                    resolve('Update survey successful');
                } else {
                    reject(ErrorConstants.SURVEY_UPDATE_FAILED);
                }
            });
        });
    }

}

export {EmployeeService as EmployeeService};
