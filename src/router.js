import {Main} from "./components/main";
import {IncomeView} from "./components/income/view";
import {IncomeCreate} from "./components/income/create";
import {IncomeEdit} from "./components/income/edit";
import {ExpensesView} from "./components/expenses/view";
import {ExpensesCreate} from "./components/expenses/create";
import {ExpensesEdit} from "./components/expenses/edit";
import {BudgetView} from "./components/budget/view";
import {BudgetCreate} from "./components/budget/create";
import {BudgetEdit} from "./components/budget/edit";
import {Form} from "./components/form";
import {HttpUtils} from "./utils/http-utils";
import {AuthServices} from "./services/auth-services";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/404',
                title: '404',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
                load: () => {
                },
            },
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/login',
                title: 'Вход',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Form(this.openNewRoute.bind(this), 'login');
                }
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    new Form(this.openNewRoute.bind(this), 'signup');
                }
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/view.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/income/create',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/income/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/income/edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/income/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/view.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expense/create',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/expenses/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesCreate(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expense/edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/expenses/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesEdit(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/budget',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/budget/view.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new BudgetView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/budget/create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/budget/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new BudgetCreate(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/budget/edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/budget/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new BudgetEdit(this.openNewRoute.bind(this));
                }
            },
        ];

    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // отлавливаем момент, когда стр. загружается
        window.addEventListener('popstate', this.activateRoute.bind(this)); // момент, когда меняется URL
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }

        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    async openNewRoute(newUrlRoute) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', newUrlRoute);
        await this.activateRoute(currentRoute);
    }

    async activateRoute() {

        const urlRoute = window.location.pathname;
        let newRoute = this.routes.find(item => item.route === urlRoute);

        if (urlRoute === '/logout') {
            const result = await AuthServices.logout();
            if (!result.error) {
                if (!result.response) {
                    this.openNewRoute('/login').then();
                }
            }
            this.openNewRoute('/').then();
            return;
        }

        if (newRoute) {
            if (newRoute.title) { // заголовок вкладки
                this.titlePageElement.innerText = `${newRoute.title} | LumincoinFinance`;
            }

            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;

                if (newRoute.useLayout) { // layout
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    this.layout(newRoute);
                    try {
                        let name = JSON.parse(localStorage.getItem('user')).name;
                        let balance = await HttpUtils.request('/balance');
                        document.getElementById('balance').innerText = balance.response.balance + '$';
                        document.getElementById('profile-name').innerText = name;
                        document.getElementById('profile-name').setAttribute('data-text', name);
                    } catch (e) {}
                }

                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') { // загрузка компонента
                newRoute.load();
            }

        } else {
            console.log('No route found');
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }

    }

    layout(route) {
        document.querySelectorAll('.menu-items a').forEach(item => {
            const href = item.getAttribute('href');
            if (route.route === href) {
                item.classList.add('active');
                if (href === '/income' || href === '/expense') {
                    document.getElementById('accordion').firstElementChild.setAttribute('aria-expanded', 'true');
                    document.getElementById('panelsStayOpen-collapseOne').classList.add('show');
                }
            } else {
                item.classList.remove('active');
            }
        });
    }
}