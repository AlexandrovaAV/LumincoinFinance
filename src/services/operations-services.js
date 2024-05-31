import {HttpUtils} from "../utils/http-utils";

export class OperationsServices {
    static async getOperation(id) {
        const result = await HttpUtils.request('/operations/' + id);

        const returnObject = {
            error: false,
            redirect: null,
        }

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при запросе данных. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.operation = result.response;
        return returnObject;
    }

    static async getOperations(dateTo = null, dateFrom = null, period = 'interval') {
        if (!dateTo) {
            dateTo = new Date().toISOString().match(/^(\d{4})(-\d{2}){2}/g)[0];
        }
        if (!dateFrom) {
            dateFrom = '1000-01-01';
        }

        const returnObject = {
            error: false,
            redirect: null,
            operations: null
        }

        const result = await HttpUtils.request('/operations?period=' + period + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при запросе всех операций. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.operations = result.response;
        return returnObject;
    }

    static async updateOperation(id, data) {
        const returnObject = {
            error: false,
            redirect: null
        }

        const result = await HttpUtils.request('/operations/' + id, 'PUT', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при обновлении данных.";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.operation = result.response;
        return returnObject;
    }

    static async deleteOperation(id,) {
        const requestDelete = await HttpUtils.request('/operations/' + id, 'DELETE');
        if (requestDelete && requestDelete.error) {
            alert('Возникла ошибка при удалении записи');
        }
    }

    static async createOperation(data) {
        const result = await HttpUtils.request('/operations/', 'POST', true, data);

        const returnObject = {
            error: false,
            redirect: null,
        }

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = "Возникла ошибка при создании дохода/расхода. Обратитесь в поддержку";
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.operation = result.response;
        return returnObject;
    }
}