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
exports.EmployeeController = void 0;
const common_1 = require("./../common");
const employee_1 = require("../services/employee");
class Employee extends common_1.RestController {
    constructor() {
        super();
        // Get All Employees
        this.getAllEmployees = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [total, data] = yield this.employeeService.getAllEmployees(req.query.filter || '', req.query.search || '', +req.query.offset || 1, +req.query.limit || 10, req.query.sort || 'emp.id', req.query.order || 'ASC');
                return this.respond(res, {
                    employees: data[0],
                    count: (data[0] && data[0].length) ? data[0].length : 0,
                    totalItems: (total && total[0] && total[0][0] && total[0][0].total) ? total[0][0].total : 0
                });
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.getDepartments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [data] = yield this.employeeService.getDepartments();
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get All Employees in same department
        this.getAllEmployeesAssessment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.user['dataValues'];
                const [total, data] = yield this.employeeService.getAllEmployeesAssessment(userData, req.query.filter || '', req.query.search || '', +req.query.offset || 1, +req.query.limit || 10, req.query.sort || 'emp.id', req.query.order || 'ASC');
                return this.respond(res, {
                    employees: data,
                    count: data.length,
                    totalItems: total
                });
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get All Employees in same department
        this.getAssessmentSurvey = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.user['dataValues'];
                const assessmentYear = +req.query.assessment_year;
                let data = yield this.employeeService.getAssessmentSurvey(userData, assessmentYear);
                return this.respond(res, { items: data[0] });
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get All Employees in same department
        this.getAssessmentServeyByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = +req.params.id;
                const assessmentYear = +req.query.assessment_year;
                let data = yield this.employeeService.getAssessmentServeyByUserId(userId, assessmentYear);
                return this.respond(res, { items: data[0] });
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get All surveys
        this.getSurveys = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.user['dataValues'];
                const [total, data] = yield this.employeeService.getSurveys(userData, req.query.search || '', +req.query.offset || 1, +req.query.limit || 10, req.query.sort || 'id', req.query.order || 'ASC');
                return this.respond(res, {
                    surveys: data[0],
                    count: (data[0] && data[0].length) ? data[0].length : 0,
                    totalItems: (total && total[0] && total[0][0] && total[0][0].total) ? total[0][0].total : 0
                });
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // update survey assessment
        this.getAssessmentSurveySubmit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.user['dataValues'];
                const formData = req.body.data || [];
                let data = yield this.employeeService.getAssessmentSurveySubmit(userData, formData);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get Employee Profile By ID
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.id;
                let data = yield this.employeeService.getEmployeeById(userId);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get Employee Profile By ID
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let formData = req.body;
                let employeeId = +formData.id;
                const full_name = formData.full_name || '';
                const email = formData.email || '';
                const position = formData.position || '';
                const department_id = formData.department_id || '';
                let data = yield this.employeeService.updateEmployee(employeeId, full_name, email, position, department_id);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        // Get Employee Profile By ID
        this.updateSurvey = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let formData = req.body;
                let surveyId = +formData.id;
                const surveyName = formData.name || '';
                const surveyDescription = formData.description || '';
                let data = yield this.employeeService.updateSurvey(surveyId, surveyName, surveyDescription);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.employeeService = new employee_1.EmployeeService();
    }
}
exports.EmployeeController = Employee;