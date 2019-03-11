import { ProxyFactory } from './proxy-factory.js/index.js.js';
import { ModelComponent } from './model-component.js/index.js.js';

export class Bind {


    constructor(model, view, ...props) {
        const proxy = ProxyFactory.create(model, [...props, ...getComponentProps()], model => {
            view.update(model)
        });

        view.update(model);

        return proxy;
    }

}

function getComponentProps() {
    const md = new ModelComponent();
    let props = Object.getOwnPropertyNames(md).concat(Object.getOwnPropertyNames(md.__proto__));
    props.shift();// constructor
    return props;
}