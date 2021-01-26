import { RestError } from './rest_error';
import { ErrorConstants } from '../../../interfaces/error_constants';

export class InvalidJsonError extends RestError {
    constructor( public message: string = 'Request does not contain valid JSON data.') {
        super(message, 400, ErrorConstants.INVALID_JSON_ERR);
        this.name = 'InvalidJsonError';
    }
}
