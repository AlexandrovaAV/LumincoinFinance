export class Main {
    constructor() {
        this.incomeElement = null;
        this.expensesElement = null;
        this.dateFromElement = null;
        this.dateToElement = null;

        this.init();
    }

    init() {
        this.diagrams();

        // оптимизировать + страница Доходы&Расходы имеет такие же кнопки.
        // сделать нажатие на все кнопки (сегодня, неделя, месяц... )
        this.dateFromElement = document.getElementById('dateFrom');
        this.dateToElement = document.getElementById('dateTo');

        this.dateFromElement.addEventListener('focusin', function () {
            this.classList.add('d-none');
            this.nextElementSibling.classList.remove('d-none');
            this.nextElementSibling.focus();
        });

        this.dateFromElement.parentElement.children[1].addEventListener('blur', function () {
            if (this.value) {
                this.previousElementSibling.innerText = new Date(this.value).toLocaleDateString();
            } else {
                this.previousElementSibling.innerText = "Дата";
            }
            this.classList.add('d-none');
            this.previousElementSibling.classList.remove('d-none');
        });

        // Оптимизировать и объединить, наверное, использовать utils
        /*this.dateToElement.addEventListener('click', function() {
            this.classList.add('d-none');
            this.nextElementSibling.classList.remove('d-none');
            this.nextElementSibling.focus();
        });
        this.dateToElement.parentElement.children[1].addEventListener('blur', function () {
            if (this.value) {
                this.previousElementSibling.innerText = this.value;
            }
            this.classList.add('d-none');
            this.previousElementSibling.classList.remove('d-none');
        });*/
    }

    diagrams() {
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
        this.plugins = {
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

        const pluginsIncome = Object.assign({}, this.plugins, {
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
        const pluginsExpenses = Object.assign({}, this.plugins, {
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

        this.incomeElement = document.getElementById('income').getContext('2d');
        this.expensesElement = document.getElementById('expenses').getContext('2d');
        this.incomeElement.canvas.height = 200;
        this.incomeElement.canvas.width = 200;
        this.expensesElement.canvas.height = 200;
        this.expensesElement.canvas.width = 200;

        let income = new Chart(this.incomeElement, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: pluginsIncome,
                    maintainAspectRatio: false,
                }
            }
        );
        let expenses = new Chart(this.expensesElement, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: pluginsExpenses,
                    maintainAspectRatio: false,
                }
            }
        );
    }
}