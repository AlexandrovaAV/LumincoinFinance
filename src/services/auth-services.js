import {HttpUtils} from "../utils/http-utils";

export class AuthServices {
    static async login(body){
        const result = await HttpUtils.request('/login', 'POST', body);

        if (result.error) {
            return;
        }

        return result;
    }
    static async signup(body){
        const result = await HttpUtils.request('/signup', 'POST', body);
        return result;
    }
}