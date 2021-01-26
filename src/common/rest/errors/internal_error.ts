import { RestError } from './rest_error';
import { ErrorConstants } from '../../../interfaces/error_constants';

export class InternalError extends RestError {
    constructor( public originalError: Error, public message: string = 'An unexpected error has occurred.') {
        super(message, 500, ErrorConstants.INTERNAL_ERR);
        this.name = 'InternalError';
    }
}
