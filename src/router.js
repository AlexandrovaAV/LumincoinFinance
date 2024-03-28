import {Login} from "./components/auth/login";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                styles: [],
                scripts: [],
                useLayout: true,
                load: ()=>{},
            },
            {
                route: '/login',
                title: 'Вход',
                filePathTemplate: '/templates/pages/auth/login.html',
                styles: [],
                scripts: [],
                useLayout: false,
                load: ()=> {
                    new Login(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/login.html', //signup
                styles: [],
                scripts: [],
                useLayout: false,
                load: ()=> {
                    // new Login(this.openNewRoute.bind(this));
                }
            }
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

    async activateRoute(oldRoute = null) {

        const urlRoute = window.location.pathname;
        let newRoute = this.routes.find(item => item.route === urlRoute); // определенная страница из массива routes

        if (newRoute) {
            if (newRoute.title) { // заголовок вкладки
                this.titlePageElement.innerText = `${newRoute.title} | LumincoinFinance`;
            }

            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;

                // код на LAYOUT

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
}