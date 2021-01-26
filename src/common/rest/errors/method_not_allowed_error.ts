import { RestError } from './rest_error';
import { ErrorConstants } from '../../../interfaces/error_constants';

export class MethodNotAllowedError extends RestError {
    constructor(public message: string = 'The endpoint does not support this HTTP method.') {
        super(message, 405, ErrorConstants.METHOD_NOT_ALLOWED);
        this.name = 'MethodNotAllowedError';
    }
}
