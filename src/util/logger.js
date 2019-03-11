import { environment, APP_INFO } from "../app-config";
const isDebugMode = environment.isDev;

const noop = () => undefined;

const timestamp = () => {
    return new Date().toISOString();
};

const getInformation = (type) => {
    return `${APP_INFO} ${timestamp()} [${type}] `;
}

export class Logger {
    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static get log() {
        if (isDebugMode) {
            return console.log.bind(console, getInformation('LOG'));
        } else {
            return noop;
        }
    }

    static get info() {
        if (isDebugMode) {
            return console.info.bind(console, getInformation('INFO'));
        } else {
            return noop;
        }
    }

    static get warn() {
        if (isDebugMode) {
            return console.warn.bind(console, getInformation('WARN'));
        } else {
            return noop;
        }
    }

    static get error() {
        if (isDebugMode) {
            return console.error.bind(console, getInformation('ERROR'));
        } else {
            return noop;
        }
    }

    static get trace() {
        if (isDebugMode) {
            return console.trace.bind(console, getInformation('TRACE'));
        } else {
            return noop;
        }
    }
}
