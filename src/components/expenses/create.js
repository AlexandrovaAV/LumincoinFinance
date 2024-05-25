import {ValidationUtils} from "../../utils/validation-utils";
import {CategoriesServices} from "../../services/categories-services";
import config from "../../config/config";

export class ExpensesCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.processCategory().then();
    }

    async processCategory() {
        const that = this;
        const inputCategoryElement = document.getElementById('category');

        document.getElementById('addButton').addEventListener('click', async function () {
            const validate = ValidationUtils.validate([inputCategoryElement]);
            if (validate) {
                const response = await CategoriesServices.addCategory(config.budgetsTypes.expense, {title: inputCategoryElement.value});
                if (!response.category) {
                    return response.redirect ? that.openNewRoute(response.redirect) : null;
                }
                return that.openNewRoute('/expense');
            }
        });
    }
}