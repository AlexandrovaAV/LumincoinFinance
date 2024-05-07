import config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpUtils {
    static async request(url, method = "GET", useAuth = true, body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        let token = null;

        if (useAuth) {
            token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);
            if (token) {
                headers["x-auth-token"] = token;
            }
        }

        if (body) {
            body = JSON.stringify(body);
        }

        const response = await fetch(config.host + url, {
            method: method,
            headers: headers,
            body: body
        });

        if (response.status < 200 || response.status >= 300) {
            if (useAuth && response.status === 401) {
                if (!token) {
                    // not token
                }
                // old token
            }
        }

        return await response.json();
    }
}