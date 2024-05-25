import {CategoriesServices} from "../../services/categories-services";
import {CategoryUtils} from "../../utils/category-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {OperationsServices} from "../../services/operations-services";
import config from "../../config/config";

export class BudgetCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.objectElements = {
            type: document.getElementById('typeSelect'),
            typeOptions: document.querySelectorAll('#typeSelect option'),
            typeExpense: document.getElementById('type-expense'),
            typeIncome: document.getElementById('type-income'),
            category: document.getElementById('categorySelect'),
            categoryOptions: null,
            amount: document.getElementById('amount'),
            date: document.getElementById('date'),
            comment: document.getElementById('comment'),
            buttonSave: document.getElementById('save')
        };

        this.fields = [this.objectElements.type, this.objectElements.category, this.objectElements.amount, this.objectElements.date, this.objectElements.comment];

        this.getData().then();
    }

    async getData() {
        const that = this;
        const expense = await CategoriesServices.getCategories(config.budgetsTypes.expense).then();
        const income = await CategoriesServices.getCategories(config.budgetsTypes.income).then();
        const type = new URLSearchParams(window.location.search).get('type');

        this.checkResult(expense.categories, expense.redirect);
        this.checkResult(income.categories, income.redirect);

        this.objectElements.type.value = type;
        CategoryUtils.fillingInFields(null, expense, income, this.objectElements).then();
        this.objectElements.buttonSave.addEventListener('click', function () {
            that.processBudgetEdit().then();
        });
    }

    async processBudgetEdit() {
        const sendToServer = {};

        if (ValidationUtils.validate(this.fields)) {
            sendToServer.type = this.objectElements.type.value;
            sendToServer.category_id = +this.objectElements.category.value;
            sendToServer.amount = this.objectElements.amount.value;
            sendToServer.date = this.objectElements.date.value;
            sendToServer.comment = this.objectElements.comment.value;

            const response = await OperationsServices.createOperation(sendToServer);
            this.checkResult(response.operation, response.redirect);
            return this.openNewRoute('/budget');
        }
    }


    checkResult(result, redirect) {
        if (!result) {
            if (redirect) {
                return redirect ? this.openNewRoute(redirect) : null;
            }
        }
    }


}