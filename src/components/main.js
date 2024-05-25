import {OperationsServices} from "../services/operations-services";
import {OperationsUtils} from "../utils/operations-utils";
import {DiagramUtils} from "../utils/diagram-utils";

export class Main {
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
            intervalsElements: document.querySelectorAll('.main-intervals button')
        }

        this.diagram = {
            income: null,
            expense: null
        }

        this.processMain().then();
    }

    async diagrams(result) {
        if (this.diagram.income && this.diagram.expense) {
            this.diagram.income.destroy();
            this.diagram.expense.destroy();
        }

        try {
            const [expense, income, dataAmountExpense, dataCategoryExpense, dataAmountIncome, dataCategoryIncome] = await OperationsUtils.checkOperations(result);
            await DiagramUtils.diagram(expense, income, dataAmountExpense, dataCategoryExpense, dataAmountIncome, dataCategoryIncome, this.diagram);
        } catch (e) {
            console.log(e);
        }
    }

    async processMain() {
        const that = this;
        let result = null;

        for (const item of this.filtersElements) {
            if (item.name === 'today') {
                result = await OperationsServices.getOperations(item.dateTo, item.dateFrom);
                that.checkResult(result);
            }
        }

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
        this.diagrams(result).then();
    }

}