import "./app.scss";
import { API } from "../app-config";

class App {
    constructor() {
        let $ = document.querySelector.bind(document);


        this._init();
    }

    _init() {
        console.log(API);
    }

    _exibeErro(erro) {
        console.error(erro);
        this._mensagem.texto = erro.message;
    }
}

let app = new App();

export default function () {
    return app;
}
