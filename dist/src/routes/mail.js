"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRoutes = void 0;
const mail_1 = require("./../controllers/mail");
const common_1 = require("../common");
const common_validator_1 = require("../validators/common_validator");
class Mail extends common_1.RestRouter {
    constructor() {
        super();
        this._mailController = new mail_1.MailController();
        this._commonValidator = new common_validator_1.CommonValidator();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/send-email/:id', this._commonValidator.validateAdmin(), this._mailController.sendEmail);
        this.router.get('/send-emails', this._commonValidator.validateAdmin(), this._mailController.sendEmails);
    }
}
exports.MailRoutes = Mail;