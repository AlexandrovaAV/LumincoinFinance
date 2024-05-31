export class DiagramUtils {
    static async diagram(expense, income, dataAmountExpense, dataCategoryExpense, dataAmountIncome, dataCategoryIncome, diagram) {
        const dataIncome = this.diagramData(dataCategoryIncome, dataAmountIncome);
        const dataExpense = this.diagramData(dataCategoryExpense, dataAmountExpense);

        const pluginsIncome = this.dataPlugins().pluginsIncome;
        const pluginsExpenses = this.dataPlugins().pluginsExpenses;

        this.incomeElement = document.getElementById('income').getContext('2d');
        this.expensesElement = document.getElementById('expenses').getContext('2d');
        this.incomeElement.canvas.height = 200;
        this.incomeElement.canvas.width = 200;
        this.expensesElement.canvas.height = 200;
        this.expensesElement.canvas.width = 200;

        diagram.income = new Chart(this.incomeElement, {
                type: 'pie',
                data: dataIncome,
                options: {
                    responsive: true,
                    plugins: pluginsIncome,
                    maintainAspectRatio: false,
                }
            }
        );
        diagram.expense = new Chart(this.expensesElement, {
                type: 'pie',
                data: dataExpense,
                options: {
                    responsive: true,
                    plugins: pluginsExpenses,
                    maintainAspectRatio: false,
                }
            }
        );
    }

    static diagramData(category, amount) {
        let colorArray = [
            'rgba(220, 53, 69, 1)',
            'rgba(13, 110, 253, 1)',
            'rgb(114,114,114)',
            'rgba(255, 193, 7, 1)',
            'rgb(13,94,62)',
            'rgba(253, 126, 20, 1)',
            'rgb(246,3,255)',
            'rgb(0,16,47)',
            'rgba(32, 201, 151, 1)'
        ];

        for (let i = colorArray.length - 1; i > 0; i--) { // алгоритм Тасование Фишера — Йетса (Кнута)
            const j = Math.floor(Math.random() * (i + 1));
            [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
        }

        return {
            labels: category.length === 0 ? ['Нет данных'] : category,
            datasets: [{
                data: amount.length === 0 ? ['Нет данных'] : amount,
                backgroundColor: colorArray,
                hoverOffset: 4
            }]
        };
    }

    static dataPlugins() {

        let plugins = {
            title: {
                display: true,
                fullSize: true,
                color: '#290661',
                font: {
                    size: 28
                }
            },
            legend: {
                labels: {
                    boxWidth: 35,
                    boxHeight: 10,
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 12
                    }
                }
            }
        };
        const pluginsIncome = Object.assign({}, plugins, {
            title: {
                display: true,
                text: 'Доходы',
                fullSize: true,
                color: '#290661',
                font: {
                    size: 28
                }
            }
        });
        const pluginsExpenses = Object.assign({}, plugins, {
            title: {
                display: true,
                text: 'Расходы',
                fullSize: true,
                color: '#290661',
                font: {
                    size: 28
                }
            }
        });

        return {
            pluginsIncome: pluginsIncome,
            pluginsExpenses: pluginsExpenses
        }
    }
}