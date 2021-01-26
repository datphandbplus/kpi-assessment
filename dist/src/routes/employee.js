"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const employee_1 = require("./../controllers/employee");
const common_1 = require("../common");
const common_validator_1 = require("../validators/common_validator");
class Employee extends common_1.RestRouter {
    constructor() {
        super();
        this._employeeController = new employee_1.EmployeeController();
        this._commonValidator = new common_validator_1.CommonValidator();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/update', this._commonValidator.validateAdmin(), this._employeeController.updateEmployee);
        this.router.post('/surveys/update', this._commonValidator.validateAdmin(), this._employeeController.updateSurvey);
        this.router.get('/', this._commonValidator.validateAdmin(), this._employeeController.getAllEmployees);
        this.router.get('/employees_assessment_list', this._commonValidator.validateAdmin(), this._employeeController.getAllEmployeesAssessment);
        this.router.get('/departments', this._commonValidator.validateAdmin(), this._employeeController.getDepartments);
        this.router.get('/assessment_survey', this._commonValidator.validateToken(), this._employeeController.getAssessmentSurvey);
        this.router.get('/assessment_survey/:id', this._commonValidator.validateAdmin(), this._employeeController.getAssessmentServeyByUserId);
        this.router.get('/surveys', this._commonValidator.validateAdmin(), this._employeeController.getSurveys);
        this.router.post('/assessment_survey_submit', this._commonValidator.validateToken(), this._employeeController.getAssessmentSurveySubmit);
        this.router.get('/:id', this._commonValidator.validateToken(), this._employeeController.getEmployeeById);
    }
}
exports.EmployeeRoutes = Employee;