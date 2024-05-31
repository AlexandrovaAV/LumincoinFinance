import config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpUtils {
    static async request(url, method = "GET", useAuth = true, body = null) {
        const result = {
            error: false,
            response: null
        };

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

        let response = null;
        try {
            response = await fetch(config.host + url, {
                method: method,
                headers: headers,
                body: body
            });
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                if (!token) {
                    // not token
                    result.redirect = '/login';
                } else {
                    // old token
                    const updateTokenResult = await AuthUtils.updateRefreshToken();
                    if (updateTokenResult) {
                        // repeat request
                        return this.request(url, method, useAuth, body);
                    } else {
                        // redirect
                        result.redirect = '/login';
                    }
                }
            }
        }

        return result;
    }
}