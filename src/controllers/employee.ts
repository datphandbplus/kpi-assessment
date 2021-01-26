import {RestController} from './../common';
import {EmployeeService} from "../services/employee";

class Employee extends RestController {
    private employeeService: EmployeeService;

    constructor() {
        super();
        this.employeeService = new EmployeeService();
    }
    // Get All Employees
    getAllEmployees = async (req, res, next) => {
        try {
            const [ total, data] = await this.employeeService.getAllEmployees(
                req.query.filter || '' ,req.query.search || '',
                +req.query.offset || 1, +req.query.limit || 10,
                req.query.sort || 'emp.id', req.query.order || 'ASC');
            return this.respond(res, {
                employees: data[0],
                count: (data[0] && data[0].length) ? data[0].length : 0,
                totalItems: (total &&  total[0] && total[0][0] && total[0][0].total) ? total[0][0].total : 0
            });
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    getDepartments = async (req, res, next) => {
        try {
            const [ data ] = await this.employeeService.getDepartments();
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get All Employees in same department
    getAllEmployeesAssessment = async (req, res, next) => {
        try {
            const userData = req.user['dataValues'];
            const [ total, data ] = await this.employeeService.getAllEmployeesAssessment(
                userData, req.query.filter || '' ,req.query.search || '',
                +req.query.offset || 1, +req.query.limit || 10,
                req.query.sort || 'emp.id', req.query.order || 'ASC');
            return this.respond(res, {
                employees: data,
                count: data.length,
                totalItems: total
            });
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get All Employees in same department
    getAssessmentSurvey = async (req, res, next) => {
        try {
            const userData = req.user['dataValues'];
            const assessmentYear = +req.query.assessment_year;
            let data = await this.employeeService.getAssessmentSurvey(userData, assessmentYear);
            return this.respond(res, {items: data[0]});
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get All Employees in same department
    getAssessmentServeyByUserId = async (req, res, next) => {
        try {
            const userId = +req.params.id;
            const assessmentYear = +req.query.assessment_year;
            let data = await this.employeeService.getAssessmentServeyByUserId(userId, assessmentYear);
            return this.respond(res, {items: data[0]});
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get All surveys
    getSurveys = async (req, res, next) => {
        try {
            const userData = req.user['dataValues'];
            const [ total, data] = await this.employeeService.getSurveys(
                userData, req.query.search || '',
                +req.query.offset || 1, +req.query.limit || 10,
                req.query.sort || 'id', req.query.order || 'ASC');
            return this.respond(res, {
                surveys: data[0],
                count: (data[0] && data[0].length) ? data[0].length : 0,
                totalItems: (total &&  total[0] && total[0][0] && total[0][0].total) ? total[0][0].total : 0
            });
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // update survey assessment
    getAssessmentSurveySubmit = async (req, res, next) => {
        try {
            const userData = req.user['dataValues'];
            const formData = req.body.data || [];
            let data = await this.employeeService.getAssessmentSurveySubmit(userData, formData);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get Employee Profile By ID
    getEmployeeById = async (req, res, next) => {
        try {
            let userId = req.params.id;
            let data = await this.employeeService.getEmployeeById(userId);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get Employee Profile By ID
    updateEmployee = async (req, res, next) => {
        try {
            let formData: any = req.body;
            let employeeId = +formData.id;
            const full_name = formData.full_name || '';
            const email = formData.email || '';
            const position = formData.position || '';
            const department_id = formData.department_id || '';
            let data = await this.employeeService.updateEmployee(employeeId, full_name, email, position, department_id);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    // Get Employee Profile By ID
    updateSurvey = async (req, res, next) => {
        try {
            let formData: any = req.body;
            let surveyId = +formData.id;
            const surveyName = formData.name || '';
            const surveyDescription = formData.description || '';
            let data = await this.employeeService.updateSurvey(surveyId, surveyName, surveyDescription);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }
}

export {Employee as EmployeeController};
