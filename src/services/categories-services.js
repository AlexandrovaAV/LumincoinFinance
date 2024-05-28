import {HttpUtils} from "../utils/http-utils";

export class CategoriesServices {
    static async getCategories(type) {
        const returnObject = {
            error: false,
            redirect: null,
            categories: null
        }
        const result = await HttpUtils.request('/categories/' + type);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при запросе данных. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.categories = result.response;
        return returnObject;
    }

    static async getCategory(id, type) {
        const returnObject = {
            error: false,
            redirect: null,
            categoryIncome: null
        }
        const result = await HttpUtils.request('/categories/'+ type + '/' + id);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при запросе данных. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.category = result.response;
        return returnObject;
    }

    static async updateCategory(type, id, data) {
        const returnObject = {
            error: false,
            redirect: null,
        }
        const result = await HttpUtils.request('/categories/' + type + '/' + id, 'PUT', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при обновлении данных. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.category = result.response;
        return returnObject;
    }

    static async addCategory(type, data) {
        const returnObject = {
            error: false,
            redirect: null,
        }
        const result = await HttpUtils.request('/categories/' + type, 'POST', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при создании категории. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.category = result.response;
        return returnObject;
    }

    static async deleteCategory(type, id) {
        const returnObject = {
            error: false,
            redirect: null,
        }
        const result = await HttpUtils.request('/categories/' + type + '/' + id, 'DELETE');

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при запросе данных. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.response = result.response;
        return returnObject;
    }
}