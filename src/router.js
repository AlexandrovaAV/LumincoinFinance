export class Router {
    constructor() {
        this.contentPageElement = document.getElementById('content');

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html'
            }
        ];

        this.addFile().then();
    }

    async addFile() {
        const urlRoute = window.location.pathname;
        let newRoute = this.routes.find(item => item.route === urlRoute);
        let contentBlock = this.contentPageElement;
        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
    }
}