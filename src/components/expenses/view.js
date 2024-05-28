import {HTMLUtils} from "../../utils/html-utils";
import config from "../../config/config";
import {CategoriesServices} from "../../services/categories-services";
import {ModalUtils} from "../../utils/modal-utils";

export class ExpensesView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.objElements = {
            categoriesElement: document.getElementById('categories'),
            recordsChangeElement: document.getElementById('records-change')
        }

        this.getData().then();
    }

    async getData() {
        if (this.objElements.categoriesElement.innerText !== '') {
            this.objElements.categoriesElement.innerHTML = '';
        }

        const addElement = document.createElement('div');
        addElement.classList.add('card');
        addElement.classList.add('income-expenses-add');
        addElement.innerHTML = HTMLUtils.categoriesGetHTMLForAddElement(config.budgetsTypes.expense);

        this.objElements.categoriesElement.appendChild(addElement);

        try {
            const expense = await CategoriesServices.getCategories(config.budgetsTypes.expense);
            this.checkResult(expense);
        } catch (e) {
            console.log(e);
        }
    }

    async showCategories(result) {
        const that = this;

        for (let i = 0; i < result.categories.length; i++) {
            const cardElement = document.createElement('div');

            cardElement.classList.add('card');
            cardElement.classList.add('align-items-center');
            cardElement.classList.add('align-items-sm-start');

            cardElement.innerHTML = HTMLUtils.categoriesGetHTMLForCards(result.categories[i], config.budgetsTypes.expense);

            this.objElements.categoriesElement.prepend(cardElement);

            // DELETE
            document.getElementById(`records-delete${result.categories[i].id}`).addEventListener('click', function() {
                ModalUtils.buttonModalChange(that.objElements, result.categories[i]);
                document.getElementById(`records-change-delete${result.categories[i].id}`).addEventListener('click', async function (e) {
                    await CategoriesServices.deleteCategory(config.budgetsTypes.expense, result.categories[i].id);
                    setTimeout(async function (){
                        that.getData().then();
                    }, 0)
                });
            });
        }
    }

    checkResult(result) {
        if (!result.categories) {
            if (result.redirect) {
                return result.redirect ? this.openNewRoute(result.redirect) : null;
            }
        }
        this.showCategories(result).then();
    }
}