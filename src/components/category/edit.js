import {CategoriesServices} from "../../services/categories-services";
import config from "../../config/config";
import {ValidationUtils} from "../../utils/validation-utils";

export class CategoryEdit {
    constructor(openNewRoute, page) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.cancelElement = document.getElementById('cancel');
        const id = new URLSearchParams(window.location.search).get('id');
        const title = document.getElementById('category-title');

        if (!id) {
            return history.back();
        }

        if (this.page === config.budgetsTypes.income) {
            this.cancelElement.href = '/' + this.page;
            title.innerText = 'Редактирование категории доходов';
            this.getData(id, this.page).then();
        }
        if (this.page === config.budgetsTypes.expense) {
            this.cancelElement.href = '/' + this.page;
            title.innerText = 'Редактирование категории расходов';
            this.getData(id, this.page).then();
        }

    }

    async getData(id, type) {
        const result = await CategoriesServices.getCategory(id, type);
        this.checkResult(result, type);
    }

    async processCategory(category, type) {
        const that = this;
        const inputCategoryElement = document.getElementById('category');
        inputCategoryElement.value = category.title;

        document.getElementById('saveButton').addEventListener('click', async function() {
            const validate = ValidationUtils.validate([inputCategoryElement]);
            if (validate) {
                if (inputCategoryElement.value !== category.title) {
                    const response = await CategoriesServices.updateCategory(type, category.id, {title: inputCategoryElement.value});
                    if (!response.category) {
                        return response.redirect ? that.openNewRoute(response.redirect) : null;
                    }
                    return that.openNewRoute('/' + type);
                }
            }
        });
    }

    checkResult(result, type) {
        if (!result.category) {
            return result.redirect ? this.openNewRoute(result.redirect) : null;
        }

        this.processCategory(result.category, type).then();
    }

}