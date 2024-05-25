import {OperationsServices} from "../../services/operations-services";
import {CategoriesServices} from "../../services/categories-services";
import {CategoryUtils} from "../../utils/category-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import config from "../../config/config";

export class BudgetEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = new URLSearchParams(window.location.search).get('id');

        if (!id) {
            alert('Произошла какая-то ошибка!');
            this.openNewRoute('/');
        }

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

        this.getData(id).then();
    }

    async getData(id) {
        const that = this;
        const resultOperation = await OperationsServices.getOperation(id);
        const expense = await CategoriesServices.getCategories(config.budgetsTypes.expense).then();
        const income = await CategoriesServices.getCategories(config.budgetsTypes.income).then();
        this.checkResult(resultOperation.operation, resultOperation.redirect);
        this.checkResult(expense.categories, expense.redirect);
        this.checkResult(income.categories, income.redirect);

        const operation_new = await CategoryUtils.fillingInFields(resultOperation.operation, expense, income, this.objectElements).then();
        this.objectElements.buttonSave.addEventListener('click', function () {
            that.processBudgetEdit(operation_new, id).then();
        });
    }

    async processBudgetEdit(operation, id) {
        const sendToServer = {
            type: operation.type,
            category_id: +operation.category,
            amount: operation.amount,
            date: operation.date,
            comment: operation.comment
        };

        const initialValues = {
            type: operation.type,
            category_id: +operation.category,
            amount: operation.amount,
            date: operation.date,
            comment: operation.comment
        };

        const newValues = {
            type: this.objectElements.type.value,
            category_id: +this.objectElements.category.value,
            amount: +this.objectElements.amount.value,
            date: this.objectElements.date.value,
            comment: this.objectElements.comment.value
        }

        if (ValidationUtils.validate(this.fields)) {
            let check = [];

            if (sendToServer.type !== newValues.type) {
                sendToServer.type = newValues.type;
            }
            if (sendToServer.category_id !== newValues.category_id) {
                sendToServer.category_id = newValues.category_id;
            }
            if (sendToServer.amount !== newValues.amount) {
                sendToServer.amount = newValues.amount;
            }
            if (sendToServer.date !== newValues.date) {
                sendToServer.date = newValues.date;
            }
            if (sendToServer.comment !== newValues.comment) {
                sendToServer.comment = newValues.comment;
            }

            for (let key in initialValues) {
                if (initialValues[key] === sendToServer[key]) {
                    check.push(true);
                } else {
                    check.push(false);
                }
            }

            let checkResult = check.some(item => item === false); // возвращает true, если есть false

            if (checkResult) {
                const response = await OperationsServices.updateOperation(id, sendToServer);

                this.checkResult(response.operation);
                this.openNewRoute('/budget');
            }
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