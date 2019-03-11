import { ApplicationError } from "./application-error";

export class HttpError extends ApplicationError {

    constructor(code) {
        super(getHttpCodeMessage(code))
        Object.setPrototypeOf(this, HttpError.prototype)// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}

export function isHttpError(err) {
    return err instanceof HttpError || Object.getPrototypeOf(err) instanceof HttpError
}

export const isNetworkError = (error) => {
    return (error.status === HttpStatusCode.NETWORK_NOT_FOUND || !isOnLine());
}

export const isOnLine = () => {
    return navigator.onLine
}

export const HttpStatusCode = {
    0: 'NETWORK_NOT_FOUND',
    304: 'NOT_MODIFIED',
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    408: 'REQUEST_TIMEOUT',
    415: 'UNSUPPORTED_MEDIA_TYPE',
    500: 'INTERNAL_SERVER_ERROR',
    502: 'BAD_GATEWAY',
    504: 'GATEWAY_TIMEOUT',
    505: 'HTTP_VERSION_NOT_SUPPORTED'
}

const HttpStatusCodeMessages = {
    NETWORK_NOT_FOUND: "Nenhuma conexão com a Internet disponível",
    FORBIDDEN: "Acesso não permitido",
    NOT_FOUND: "Não foi encontrado",
    HTTP_VERSION_NOT_SUPPORTED: "Erro de conexão com o servidor",
    INTERNAL_SERVER_ERROR: "Houve um problema interno no servidor"
};

export function getHttpCodeMessage(code) {
    return HttpStatusCodeMessages[HttpStatusCode[code]];
}
