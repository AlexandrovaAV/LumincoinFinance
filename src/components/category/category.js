import {HTMLUtils} from "../../utils/html-utils";
import config from "../../config/config";
import {CategoriesServices} from "../../services/categories-services";
import {ModalUtils} from "../../utils/modal-utils";

export class Category {
    constructor(openNewRoute, page) {
        this.openNewRoute = openNewRoute;
        this.page = page;

        this.objElements = {
            categoriesElement: document.getElementById('categories'),
            recordsChangeElement: document.getElementById('records-change'),
            title: document.getElementById('category-title')
        }

        if (this.page === config.budgetsTypes.income) {
            this.objElements.title.innerText = 'Доходы';
            this.getData(config.budgetsTypes.income).then();
        }
        if (this.page === config.budgetsTypes.expense) {
            this.objElements.title.innerText = 'Расходы';
            this.getData(config.budgetsTypes.expense).then();
        }
    }

    async getData(type) {
        if (this.objElements.categoriesElement.innerText !== '') {
            this.objElements.categoriesElement.innerHTML = '';
        }

        const addElement = document.createElement('div');
        addElement.classList.add('card');
        addElement.classList.add('income-expenses-add');
        addElement.innerHTML = HTMLUtils.categoriesGetHTMLForAddElement(type);

        this.objElements.categoriesElement.appendChild(addElement);

        try {
            const result = await CategoriesServices.getCategories(type);
            this.checkResult(result, type);
        } catch (e) {
            console.log(e);
        }
    }

    async showCategories(result, type) {
        const that = this;

        for (let i = 0; i < result.categories.length; i++) {
            const cardElement = document.createElement('div');

            cardElement.classList.add('card');
            cardElement.classList.add('align-items-center');
            cardElement.classList.add('align-items-sm-start');

            cardElement.innerHTML = HTMLUtils.categoriesGetHTMLForCards(result.categories[i], type);

            this.objElements.categoriesElement.prepend(cardElement);

            // DELETE
            document.getElementById(`records-delete${result.categories[i].id}`).addEventListener('click', function () {
                ModalUtils.buttonModalChange(that.objElements, result.categories[i]);
                document.getElementById(`records-change-delete${result.categories[i].id}`).addEventListener('click', async function (e) {
                    await CategoriesServices.deleteCategory(type, result.categories[i].id);
                    setTimeout(async function () {
                        that.getData(that.page).then();
                    }, 0)
                });
            });
        }
    }

    checkResult(result, type) {
        if (!result.categories) {
            if (result.redirect) {
                return result.redirect ? this.openNewRoute(result.redirect) : null;
            }
        }
        this.showCategories(result, type).then();
    }
}