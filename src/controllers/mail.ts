import {RestController} from './../common';
import {MailService} from "../services/mail";

class Mail extends RestController {
    private mailService: MailService;

    constructor() {
        super();
        this.mailService = new MailService();
    }

    sendEmail = async (req, res, next) => {
        const departmentId = +req.params.id || 6;
        try {
            const data = await this.mailService.sendEmail(departmentId);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }

    sendEmails = async (req, res, next) => {
        const emailsList = req.query.emails || '';
        try {
            const data = await this.mailService.sendEmails(emailsList);
            return this.respond(res, data);
        } catch (error) {
            return this.respondWithErrorMessage(res, error.message, error.code);
        }
    }
}

export {Mail as MailController};
