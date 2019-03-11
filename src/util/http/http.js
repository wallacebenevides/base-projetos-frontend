import { URLSearchParams } from "url";
import { serialize } from '../operators';

const postHeaders = [
    { name: "content-type", value: "application/x-www-form-urlencoded" },
    { name: "X-Requested-With", value: 'XMLHttpRequest' },
];

const getHeaders = [
    { name: "content-type", value: "application/json" }
];

export const http = {

    get(url, params, headers = getHeaders) {

        let body;

        if (params) {
            body = new URLSearchParams();
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    body.set(key, params[key]);
                }
            }
        }

        return this.request('GET', url, body, headers);

    },

    post(url, body, headers = postHeaders) {
        return this.request("POST", url, serialize(body), headers);
    },

    request(method, url, body, headers) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            headers.forEach(({ name, value }) => xhr.setRequestHeader(name, value));
            xhr.addEventListener("load", () => {

                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            });
            xhr.send(body);
        });
    }
};
