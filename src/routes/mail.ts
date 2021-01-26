import {MailController} from './../controllers/mail';
import {RestRouter} from '../common';
import { CommonValidator } from '../validators/common_validator';

class Mail extends RestRouter {
    private _mailController: MailController;
    private _commonValidator : CommonValidator;

    constructor() {
        super();
        this._mailController = new MailController();
        this._commonValidator = new CommonValidator();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/send-email/:id', this._commonValidator.validateAdmin(), this._mailController.sendEmail);
        this.router.get('/send-emails', this._commonValidator.validateAdmin(), this._mailController.sendEmails);
    }
}

export {Mail as MailRoutes};

