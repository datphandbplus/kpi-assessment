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
exports.MailController = void 0;
const common_1 = require("./../common");
const mail_1 = require("../services/mail");
class Mail extends common_1.RestController {
    constructor() {
        super();
        this.sendEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const departmentId = +req.params.id || 6;
            try {
                const data = yield this.mailService.sendEmail(departmentId);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.sendEmails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const emailsList = req.query.emails || '';
            try {
                const data = yield this.mailService.sendEmails(emailsList);
                return this.respond(res, data);
            }
            catch (error) {
                return this.respondWithErrorMessage(res, error.message, error.code);
            }
        });
        this.mailService = new mail_1.MailService();
    }
}
exports.MailController = Mail;