import { RestError } from './rest_error';
import { ErrorConstants } from '../../../interfaces/error_constants';
export class InvalidResourceUrlError extends RestError {
    constructor(public message: string = 'Not a valid resource url.') {
        super(message, 404, ErrorConstants.INVALID_RESOURCE_URL);
        this.name = 'InvalidResourceUrlError';
    }
}
