import {HttpUtils} from "../utils/http-utils";
import {AuthUtils} from "../utils/auth-utils";

export class AuthServices {
    static async login(body) {
        const result = await HttpUtils.request('/login', 'POST', false, body);

        if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken && !result.response.tokens.refreshToken && !result.response.user.id))) {
            return;
        }

        return result.response;
    }

    static async logout() {
        const refreshToken = AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey);
        if (refreshToken) {
            const response = await HttpUtils.request('/logout', 'POST', false, {refreshToken: refreshToken});
            AuthUtils.removeAuthInfo();
            return response;
        }
    }

    static async signup(body) {
        const result = await HttpUtils.request('/signup', 'POST', false, body);

        if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken && !result.response.tokens.refreshToken && !result.response.user.id))) {
            return;
        }

        return result.response;
    }
}