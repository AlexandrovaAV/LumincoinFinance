import config from "../config/config";

export class CategoryUtils {
    static async fillingInFields(operation, expense, income, objectElements) {
        const that = this;
        let operation_new = null;

        try {
            if (operation) {
                if (operation.type === objectElements.typeExpense.getAttribute('value')) {
                    objectElements.typeExpense.setAttribute('selected', 'selected');
                    this.changingSelect(objectElements.category, expense.categories, operation.category);
                    operation.category = objectElements.category.value;
                    operation_new = operation;
                }
                if (operation.type === objectElements.typeIncome.getAttribute('value')) {
                    objectElements.typeIncome.setAttribute('selected', 'selected');
                    this.changingSelect(objectElements.category, income.categories, operation.category);
                    operation.category = objectElements.category.value;
                    operation_new = operation;
                }
                objectElements.amount.value = operation.amount;
                objectElements.date.value = operation.date;
                objectElements.comment.value = operation.comment;
            }
            if (!operation || operation) {
                if (!operation) {
                    if (objectElements.type.value === config.budgetsTypes.expense) {
                        objectElements.typeExpense.setAttribute('selected', 'selected');
                        this.changingSelect(objectElements.category, expense.categories);
                    }
                    if (objectElements.type.value === config.budgetsTypes.income) {
                        objectElements.typeIncome.setAttribute('selected', 'selected');
                        this.changingSelect(objectElements.category, income.categories);
                    }
                }
                objectElements.type.addEventListener('change', async function () {
                    objectElements.typeExpense.removeAttribute('selected');
                    objectElements.typeIncome.removeAttribute('selected');
                    for (let i = 0; i < objectElements.typeOptions.length; i++) {
                        if (this.value === objectElements.typeOptions[i].getAttribute('value')) {
                            objectElements.typeOptions[i].setAttribute('selected', 'selected');
                            if (objectElements.typeOptions[i].getAttribute('value') === config.budgetsTypes.expense) {
                                that.changingSelect(objectElements.category, expense.categories);
                                objectElements.categoryOptions = document.querySelectorAll('#categorySelect option');
                            }
                            if (objectElements.typeOptions[i].getAttribute('value') === config.budgetsTypes.income) {
                                that.changingSelect(objectElements.category, income.categories);
                                objectElements.categoryOptions = document.querySelectorAll('#categorySelect option');
                            }
                        }
                    }
                });
                objectElements.category.addEventListener('change', function () {
                    if (!objectElements.categoryOptions) {
                        objectElements.categoryOptions = document.querySelectorAll('#categorySelect option');
                    }
                    that.choosingCategory(objectElements.categoryOptions, this);
                });
            }
        } catch (e) {
            console.log(e);
        }

        return operation_new;
    }
    static changingSelect(parent, data, category) {
        parent.innerHTML = '';

        const createNotSelectedElement = document.createElement('option');
        createNotSelectedElement.innerText = 'не выбрано';
        createNotSelectedElement.setAttribute('value', '');
        parent.appendChild(createNotSelectedElement);

        data.forEach(item => {
            let optionCreateElement = document.createElement('option');
            if (category && category === item.title) {
                optionCreateElement.setAttribute('selected', 'selected');
            }
            optionCreateElement.setAttribute('value', item.id);
            optionCreateElement.innerText = item.title;
            parent.appendChild(optionCreateElement);
        });

    }
    static choosingCategory(categoryOptions, current) {
        categoryOptions.forEach(item => {
            item.removeAttribute('selected');

            if (current.value === item.getAttribute('value')) {
                item.setAttribute('selected', 'selected');
            }
        });
    }

}