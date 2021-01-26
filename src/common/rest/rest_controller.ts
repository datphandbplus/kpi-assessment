import {Response} from 'express';
import {RestResponse} from './rest_response';
import {InternalError, MethodNotAllowedError, ResourceNotFoundError} from './errors';
import * as _ from 'underscore';

export class RestController {
    constructor() { }

    respond(res: Response, item: any | Array<any>, statusCode: number = 200): Response {
        const response = new RestResponse(statusCode, item);
        return res.status(statusCode).json(response);
    }

    respondNoContent(res: Response, statusCode: number = 204): Response {
        return res.status(statusCode).json();
    }

    respondWithErrorMessage(res: Response, item: any | Array<any>, statusCode: number = 400): Response {
        const response = new RestResponse(statusCode, item);
        let error:any= {};
        error['code'] = statusCode;
        if(item.errors && item.errors.length>0 && item.errors[0].message) {
            error.data = {
                success : false,
                message: item.errors[0].message
            }
            return res.status(statusCode).json(error); 
        }
        if(item.message){
            let msg = item.message.split(':');
            if(msg[0] == "Error"){
                error.data = { 
                    success : false,
                    message  :_.isObject(item) ? msg[1] : item  
                    
                };
            } else {
                error.data = { 
                    success : false,
                    message  :_.isObject(item) ? msg[0] : item  };
            }
        } else {
            error.data ={ success : false,
            message  :_.isObject(item) ? item.message : item  }
        }
        return res.status(statusCode).json(error);
    }

    validateResourceFound(item: any) {
        if (item == null) {
            throw new ResourceNotFoundError();
        }
    }

    internalErrorOccurred(item: any) {
        throw new InternalError(item);
    }

    throwMethodNotAllowedError(req, res, next) {
        throw new MethodNotAllowedError();
    }
}
