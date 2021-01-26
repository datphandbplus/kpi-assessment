// @ts-ignore
import serializeError from 'serialize-error';
import { RestError, InvalidJsonError, InternalError } from '../errors';

export class RestErrorMiddleware {

    // Error handling middleware that takes an incoming error, normalizes it to some
    // subclass of HttpError and passes it along (to eventually be logged/serialized)
    static normalizeToRestError(err, req, res, next) {
        if (err instanceof RestError) {
            return next(err);
        }

        if (err instanceof SyntaxError) {
            return next(new InvalidJsonError());
        }

        return next(new InternalError(err));
    }

    // This should typically be the last error handling middleware that's mounted by express.
    // This will serialize the error to the user, and log it.
    static serializeRestError(err: RestError, req, res, next) {

        if (err instanceof InternalError) {
            const logFriendlyErrorMessage: string = serializeError(err.originalError);
        } else {
            const logFriendlyErrorMessage: string = serializeError(err);
        }

        // serialize the error
        return res.status(err.httpStatusCode).json({
            error: err
        });
    }

}
