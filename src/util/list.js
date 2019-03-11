export class List {

    constructor() {
        super();
        this._itens = [];
        //Object.freeze(this);
    }

    adiciona(item) {
        this._itens.push(item);
    }

    esvazia() {
        this._itens = [];
    }

    get itens() {
        return [].concat(this._itens);
    }
}
