import config from "../config/config";

export class HttpUtils {
    static async request(url, method = "GET", body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (body) {
            body = JSON.stringify(body);
        }

        let token = null;

        const response = await fetch(config.host + url, {
            method: method,
            headers: headers,
            body: body
        });

        if (response.status < 200 || response.status >= 300) {
            if (response.status === 401) {

            }
        }

        return await response.json();
    }
}