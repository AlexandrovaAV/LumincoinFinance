export class Login {
    constructor() {
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');

        this.buttonElement = document.getElementById('button');
        this.buttonElement.addEventListener('click', (e) => {
            this.validate().then();
        });
    }

    async validate() {
        // email reg ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
        if (!this.emailInputElement.value || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.exec(this.emailInputElement.value)) {
            this.emailInputElement.classList.add('border-danger');
            this.emailInputElement.nextElementSibling.classList.add('d-block');
        } else {
            this.emailInputElement.classList.remove('border-danger');
            this.emailInputElement.nextElementSibling.classList.remove('d-block');
            this.emailInputElement.nextElementSibling.classList.add('d-none');
        }
        // password reg ^.*(?=.{8,})(?=.*[A-Z])(?=.*\d).*$
        if (!this.passwordInputElement.value || !/^.*(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/gm.exec(this.passwordInputElement.value)) {
            if (!this.passwordInputElement.value) {
                this.passwordInputElement.nextElementSibling.innerText='Поле обязательно к заполнению';
            } else {
                this.passwordInputElement.nextElementSibling.innerText='Пароль неверный';
            }
            this.passwordInputElement.classList.add('border-danger');
            this.passwordInputElement.nextElementSibling.classList.add('d-block');
        } else {
            this.passwordInputElement.classList.remove('border-danger');
            this.passwordInputElement.nextElementSibling.classList.remove('d-block');
            this.passwordInputElement.nextElementSibling.classList.add('d-none');
        }

    }
}