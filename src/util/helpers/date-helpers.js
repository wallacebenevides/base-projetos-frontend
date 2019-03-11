export class DateConverter {

    constructor() {

        throw new Error('Esta classe não pode ser instanciada');
    }

    static paraTexto(data) {

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static paraData(texto) {

        return new Date(...texto.split('-')
            .reverse()
            );
    }
}

export const normalizaData = ( e ) => {
    var d = e.split("-");
    return new Date(d[2]+"/"+d[1]+"/"+d[0]);
}
