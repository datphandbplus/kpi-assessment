"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("../lib/common");
const SequeLize = require('sequelize');
const CONFIG = require('../../config/config');
const DB_CONFIG = CONFIG['development'] ? CONFIG['development'] : (CONFIG['staging'] ? CONFIG['staging'] : CONFIG['production']);
const nodemailer = require('nodemailer');
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: DB_CONFIG.mailer.host,
            port: DB_CONFIG.mailer.port,
            auth: DB_CONFIG.mailer.auth,
            secure: DB_CONFIG.mailer.secure,
            tls: DB_CONFIG.mailer.tls,
            pool: DB_CONFIG.mailer.pool
        });
        this.sequelize = new SequeLize(DB_CONFIG.path2, {
            operatorsAliases: false,
            logging: false,
            define: {
                timestamps: false
            }
        });
        this.sendEmail = (departmentId) => __awaiter(this, void 0, void 0, function* () {
            const query = `
                        SELECT distinct
                            dp.id as department_id, dp.name as department_name, de.id as employee_id, 
                            de.full_name as full_name, de.email
                        FROM dbplus_kpi_lezo.hr_employees as de
                        INNER JOIN dbplus_kpi_lezo.hr_departments as dp on dp.id = de.department_id
                        WHERE dp.id=${departmentId}`;
            const res = yield this.sequelize.query(query);
            const employeesList = (res && res[0]) ? res[0] : [];
            try {
                const sentEmails = [];
                for (let to of employeesList) {
                    const password = common_1.Common.cyrb53(`${(to.email ? to.email : '') + '@123'}`);
                    const content = `<p style="font-weight: bold">Thân gửi Anh/Chị ${to.full_name},<p>`
                        + ` <p>Theo như <strong>THÔNG BÁO VỀ VIỆC ĐÁNH GIÁ NĂNG LỰC NHÂN VIÊN NĂM ${(new Date()).getFullYear()}</strong> và`
                        + ` <strong>HƯỚNG DẪN ĐÁNH GIÁ NĂNG LỰC NĂM ${(new Date()).getFullYear()}</strong> mà Phòng HC-NS đã gửi.</p><p>Anh/Chị vui lòng click vào link bên dưới sau đó đăng nhập <span style="background: yellow; font-weight: bold">EMAIL</span> và <span style="background: yellow; font-weight: bold">PASSWORD <i>(đính kèm)</i></span> để thực hiện đánh giá nhé.</p>`
                        + ` <p>Link: <a href="${DB_CONFIG.assessment_url}">${'DBPLUS-ĐÁNH GIÁ NĂM ' + (new Date()).getFullYear() + ' PHẦN: ĐÁNH GIÁ CHÉO-HÀNH VI ỨNG XỬ CỐT LÕI'}</a></p><p>Email: ${to.email}</p><p>Password: ${password}</p><p>Trân trọng,</p><hr/>${DB_CONFIG.mailer.signature}`;
                    if (to.email) {
                        try {
                            yield this.transporter.sendMail({
                                from: DB_CONFIG.mailer.from,
                                to: to.email,
                                subject: ('Đánh giá năng lực năm ' + (new Date()).getFullYear() + ' - Phòng/Ban ' + to.department_name),
                                html: content
                            });
                            yield this.sequelize.query('delete from `dbplus_kpi_lezo`.`staff_assessments` where employee_id=' + to.employee_id);
                            sentEmails.push(to.email);
                            const assessmentRes = yield this.sequelize.query(`select * from dbplus_kpi_lezo.staff_assessments where assessment_year=${(new Date()).getFullYear()} and assessments like '%"by":${to.employee_id}%'`);
                            const assessments = (assessmentRes && assessmentRes[0]) ? assessmentRes[0] : [];
                            for (let assessment of assessments) {
                                const lastAssessments = JSON.parse(assessment.assessments);
                                const findIndex = lastAssessments.map(ass => +ass.by).indexOf(+to.employee_id);
                                if (findIndex !== -1) {
                                    lastAssessments.splice(findIndex, 1);
                                }
                                if (lastAssessments.length < 1) {
                                    yield this.sequelize.query(`delete from dbplus_kpi_lezo.staff_assessments where assessment_year=${assessment.assessment_year} and employee_id=${assessment.employee_id}`);
                                }
                                else {
                                    const assessmentsString = JSON.stringify(lastAssessments).replace(/"/g, '\\"');
                                    yield this.sequelize.query(`update dbplus_kpi_lezo.staff_assessments set assessments="${assessmentsString}" where assessment_year=${assessment.assessment_year} and employee_id=${assessment.employee_id}`);
                                }
                            }
                        }
                        catch (e) { }
                    }
                }
                ;
                return Promise.resolve('Done sent ' + sentEmails.length + ' emails successful');
            }
            catch (e) {
                Promise.reject(e);
            }
        });
        this.sendEmails = (emailsList) => __awaiter(this, void 0, void 0, function* () {
            let inList = '';
            if (emailsList) {
                let list = (emailsList.indexOf(',') !== -1) ? emailsList.split(',') : [emailsList];
                list = list.map(l => '"' + l + '"');
                inList = ' WHERE de.email in (' + list.join(',') + ')';
            }
            const query = "SELECT distinct dp.id as department_id, dp.name as department_name, de.id as employee_id, de.full_name as full_name, de.email FROM dbplus_kpi_lezo.hr_employees as de INNER JOIN dbplus_kpi_lezo.hr_departments as dp on dp.id = de.department_id" + inList;
            const res = yield this.sequelize.query(query);
            const employeesList = (res && res[0]) ? res[0] : [];
            try {
                const sentEmails = [];
                for (let to of employeesList) {
                    const password = common_1.Common.cyrb53(`${(to.email ? to.email : '') + '@123'}`);
                    const content = `<p style="font-weight: bold">Thân gửi Anh/Chị ${to.full_name},<p>`
                        + ` <p>Theo như <strong>THÔNG BÁO VỀ VIỆC ĐÁNH GIÁ NĂNG LỰC NHÂN VIÊN NĂM ${(new Date()).getFullYear()}</strong> và`
                        + ` <strong>HƯỚNG DẪN ĐÁNH GIÁ NĂNG LỰC NĂM ${(new Date()).getFullYear()}</strong> mà Phòng HC-NS đã gửi.</p><p>Anh/Chị vui lòng click vào link bên dưới sau đó đăng nhập <span style="background: yellow; font-weight: bold">EMAIL</span> và <span style="background: yellow; font-weight: bold">PASSWORD <i>(đính kèm)</i></span> để thực hiện đánh giá nhé.</p>`
                        + ` <p>Link: <a href="${DB_CONFIG.assessment_url}">${'DBPLUS-ĐÁNH GIÁ NĂM ' + (new Date()).getFullYear() + ' PHẦN: ĐÁNH GIÁ CHÉO-HÀNH VI ỨNG XỬ CỐT LÕI'}</a></p><p>Email: ${to.email}</p><p>Password: ${password}</p><p>Trân trọng,</p><hr/>${DB_CONFIG.mailer.signature}`;
                    if (to.email) {
                        try {
                            yield this.transporter.sendMail({
                                from: DB_CONFIG.mailer.from,
                                to: to.email,
                                subject: ('Đánh giá năng lực năm ' + (new Date()).getFullYear() + ' - Phòng/Ban ' + to.department_name),
                                html: content
                            });
                            sentEmails.push(to.email);
                            const assessmentRes = yield this.sequelize.query(`select * from dbplus_kpi_lezo.staff_assessments where assessment_year=${(new Date()).getFullYear()} and assessments like '%"by":${to.employee_id}%'`);
                            const assessments = (assessmentRes && assessmentRes[0]) ? assessmentRes[0] : [];
                            for (let assessment of assessments) {
                                const lastAssessments = JSON.parse(assessment.assessments);
                                const findIndex = lastAssessments.map(ass => +ass.by).indexOf(+to.employee_id);
                                if (findIndex !== -1) {
                                    lastAssessments.splice(findIndex, 1);
                                }
                                if (lastAssessments.length < 1) {
                                    yield this.sequelize.query(`delete from dbplus_kpi_lezo.staff_assessments where assessment_year=${assessment.assessment_year} and employee_id=${assessment.employee_id}`);
                                }
                                else {
                                    const assessmentsString = JSON.stringify(lastAssessments).replace(/"/g, '\\"');
                                    yield this.sequelize.query(`update dbplus_kpi_lezo.staff_assessments set assessments="${assessmentsString}" where assessment_year=${assessment.assessment_year} and employee_id=${assessment.employee_id}`);
                                }
                            }
                        }
                        catch (e) { }
                    }
                }
                ;
                return Promise.resolve('Done sent ' + sentEmails.length + ' emails successful');
            }
            catch (e) {
                Promise.reject(e);
            }
        });
        this.transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Server is ready to take our messages');
            }
        });
    }
}
exports.MailService = MailService;