import {ValidationUtils} from "../../utils/validation-utils";
import {CategoriesServices} from "../../services/categories-services";
import config from "../../config/config";

export class CategoryCreate {
    constructor(openNewRoute, page) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.cancelElement = document.getElementById('cancel');
        const title = document.getElementById('category-title');


        if (this.page === config.budgetsTypes.income) {
            this.cancelElement.href = '/' + this.page;
            title.innerText = 'Создание категории доходов';
            this.processCategory(this.page).then();
        }
        if (this.page === config.budgetsTypes.expense) {
            this.cancelElement.href = '/' + this.page;
            title.innerText = 'Создание категории расходов';
            this.processCategory(this.page).then();
        }
    }

    async processCategory(type) {
        const that = this;
        const inputCategoryElement = document.getElementById('category');

        document.getElementById('addButton').addEventListener('click', async function () {
            const validate = ValidationUtils.validate([inputCategoryElement]);
            if (validate) {
                const response = await CategoriesServices.addCategory(type, {title: inputCategoryElement.value});
                if (!response.category) {
                    return response.redirect ? that.openNewRoute(response.redirect) : null;
                }
                return that.openNewRoute('/' + type);
            }
        });
    }
}