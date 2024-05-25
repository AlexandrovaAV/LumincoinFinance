import {CategoriesServices} from "../../services/categories-services";
import config from "../../config/config";
import {ValidationUtils} from "../../utils/validation-utils";

export class IncomeEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = new URLSearchParams(window.location.search).get('id');

        if (!id) {
            return history.back();
        }

        this.getData(id).then();
    }

    async getData(id) {
        const income = await CategoriesServices.getCategory(id, config.budgetsTypes.income);
        this.checkResult(income);
    }

    async processCategory(category) {
        const that = this;
        const inputCategoryElement = document.getElementById('category');
        inputCategoryElement.value = category.title;

        document.getElementById('saveButton').addEventListener('click', async function() {
            const validate = ValidationUtils.validate([inputCategoryElement]);
            if (validate) {
                if (inputCategoryElement.value !== category.title) {
                    const response = await CategoriesServices.updateCategory(config.budgetsTypes.income, category.id, {title: inputCategoryElement.value});
                    if (!response.category) {
                        return response.redirect ? that.openNewRoute(response.redirect) : null;
                    }
                    return that.openNewRoute('/income');
                }
            }
        });
    }

    checkResult(result) {
        if (!result.categoryIncome) {
            return result.redirect ? this.openNewRoute(result.redirect) : null;
        }

        this.processCategory(result.categoryIncome).then();
    }
}