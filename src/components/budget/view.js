import {OperationsServices} from "../../services/operations-services";
import {HTMLUtils} from "../../utils/html-utils";
import {ModalUtils} from "../../utils/modal-utils";

export class BudgetView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.reg = /^(\d{4})(-\d{2}){2}/g;

        this.filtersElements = [
            {
                element: document.getElementById('today'),
                dateFrom: new Date().toISOString().match(this.reg)[0],
                dateTo: null,
                name: 'today'
            },
            {
                element: document.getElementById('week'),
                dateFrom: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().match(this.reg)[0],
                dateTo: null,
                name: 'week'
            },
            {
                element: document.getElementById('month'),
                dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().match(this.reg)[0],
                dateTo: null,
                name: 'month'
            },
            {
                element: document.getElementById('year'),
                dateFrom: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().match(this.reg)[0],
                dateTo: null,
                name: 'year'
            },
            {
                element: document.getElementById('all'),
                dateFrom: null,
                dateTo: null,
                name: 'all'
            },
            {
                element: document.getElementById('interval'),
                dateFrom: null,
                dateTo: null,
                name: 'interval'
            },
        ];

        this.objElements = {
            intervalBlockElement: document.getElementById('interval-block'),
            dateFromElement: document.getElementById('dateFrom'),
            dateToElement: document.getElementById('dateTo'),
            applyElement: document.getElementById('apply'),
            intervalsElements: document.querySelectorAll('.main-intervals button'),
            recordsChangeElement: document.getElementById('records-change')
        }

        this.processBudget().then();
    }

    async showRecords(result) {
        const recordsElement = document.getElementById('records');
        const that = this;

        if (recordsElement.innerText !== '') {
            recordsElement.innerHTML = '';
        }

        for (let i = 0; i < result.operations.length; i++) {
            const trElement = document.createElement('tr');
            trElement.innerHTML = HTMLUtils.budgetGetHTMLForRecords(result.operations[i], i);
            recordsElement.appendChild(trElement);

            // BUTTON DELETE
            document.getElementById(`records-delete${result.operations[i].id}`).addEventListener('click', function() {
                ModalUtils.buttonModalChange(that.objElements, result.operations[i]);
                document.getElementById(`records-change-delete${result.operations[i].id}`).addEventListener('click', async function (e) {
                    await OperationsServices.deleteOperation(result.operations[i].id);
                    setTimeout(async function (){
                       await that.filtersElements.forEach(item => {
                            if (item.name === 'all') {
                                item.element.click();
                            }
                        });
                    }, 0)
                });
            });
        }
    }

    async processBudget () {
        const that = this;
        let result = null;

        for (const item of this.filtersElements) {
            if (item.name === 'today') {
                result = await OperationsServices.getOperations(item.dateTo, item.dateFrom);
                that.checkResult(result);
            }
        }

        // кнопки (фильтрация)
        this.filtersElements.forEach(item => {
            item.element.addEventListener('click', async function () {
                that.objElements.intervalsElements.forEach(item => item.classList.remove('btn-secondary') || item.classList.add('btn-outline-secondary'));
                item.element.classList.remove('btn-outline-secondary');
                item.element.classList.add('btn-secondary');
                that.objElements.applyElement.classList.remove('btn-outline-secondary');

                if (!item.dateTo && item.dateFrom) {
                    result = await OperationsServices.getOperations(item.dateTo, item.dateFrom);
                    that.checkResult(result);

                } else if (item.name === 'all') {
                    result = await OperationsServices.getOperations(item.dateTo, item.dateFrom);
                    that.checkResult(result);
                } else if (item.name === 'interval') {
                    that.objElements.intervalBlockElement.classList.remove('d-none');
                    that.objElements.applyElement.classList.remove('d-none');
                    return;
                }
            });
            that.objElements.applyElement.onclick = async function () {
                item.dateFrom = that.objElements.dateFromElement.value;
                item.dateTo = that.objElements.dateToElement.value;
                that.objElements.intervalBlockElement.classList.add('d-none');
                this.classList.add('d-none');
                result = await OperationsServices.getOperations(item.dateTo, item.dateFrom);
                that.checkResult(result);
            };
        });
    }

    checkResult(result) {
        if (!result.operations) {
            if (result.redirect) {
                return result.redirect ? this.openNewRoute(result.redirect) : null;
            }
        }
        this.showRecords(result).then();
    }
}