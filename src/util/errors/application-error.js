export class ApplicationError extends Error {

    constructor(msg = '') {
        super(msg);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, ApplicationError.prototype)// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}

export function isApplicationError(err) {
    return err instanceof ApplicationError || Object.getPrototypeOf(err) instanceof ApplicationError
}

export function getErrorMessage(err) {
    return isApplicationError(err) ? err.message : 'Não foi possível realizar a operação.';
}
