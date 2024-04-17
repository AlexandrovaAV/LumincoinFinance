export class Main {
    constructor() {
        console.log('ГЛАВНАЯ');
        const data = {
            labels: [
                'Red',
                'Blue',
                'Yellow',
                'Orange',
                'Green'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100, 20, 10],
                backgroundColor: [
                    'rgba(220, 53, 69, 1)',
                    'rgba(13, 110, 253, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(253, 126, 20, 1)',
                    'rgba(32, 201, 151, 1)'
                ],
                hoverOffset: 4
            }]
        };
        const plugins = {
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

        const incomeElement = document.getElementById('income').getContext('2d');
        const expensesElement = document.getElementById('expenses').getContext('2d');
        incomeElement.canvas.height = 200;
        incomeElement.canvas.width = 200;
        expensesElement.canvas.height = 200;
        expensesElement.canvas.width = 200;


        let income = new Chart(incomeElement, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: pluginsIncome,
                    maintainAspectRatio: false,
                }
            }
        );
        let expenses = new Chart(expensesElement, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: pluginsExpenses,
                    maintainAspectRatio: false,
                }
            }
        );
        income.resize();
        expenses.resize();

    }
}