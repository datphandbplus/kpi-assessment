import { RestError } from './rest_error';
import { ErrorConstants } from '../../../interfaces/error_constants';

export class ResourceNotFoundError extends RestError {
    constructor(public message: string = 'The resource could not be found.') {
        super(message, 404, ErrorConstants.RESOURCE_NOT_FOUND);
        this.name = 'ResourceNotFoundError';
    }
}
