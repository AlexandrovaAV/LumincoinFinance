export class Signup {
    constructor() {
        this.nameInputElement = document.getElementById('name');
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.passwordRepeatInputElement = document.getElementById('password-repeat');

        this.buttonElement = document.getElementById('button');
        this.buttonElement.addEventListener('click', (e) => {
            this.validate().then();
        });
    }

    async validate() {
        // name reg ^.*[^\d]\s*.$
        if (!this.nameInputElement.value || !/^.*[^\d]\s*.$/g.exec(this.nameInputElement.value)) {
            this.nameInputElement.classList.add('border-danger');
            this.nameInputElement.nextElementSibling.classList.add('d-block');
        } else {
            this.nameInputElement.classList.remove('border-danger');
            this.nameInputElement.nextElementSibling.classList.remove('d-block');
            this.nameInputElement.nextElementSibling.classList.add('d-none');
        }
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
        if (!this.passwordRepeatInputElement.value || this.passwordRepeatInputElement.value !== this.passwordInputElement.value) {
            if (!this.passwordRepeatInputElement.value) {
                this.passwordRepeatInputElement.nextElementSibling.innerText='Поле обязательно к заполнению';
            } else {
                this.passwordRepeatInputElement.nextElementSibling.innerText='Пароли не совпадают';
            }
            this.passwordRepeatInputElement.classList.add('border-danger');
            this.passwordRepeatInputElement.nextElementSibling.classList.add('d-block');
        } else {
            this.passwordRepeatInputElement.classList.remove('border-danger');
            this.passwordRepeatInputElement.nextElementSibling.classList.remove('d-block');
            this.passwordRepeatInputElement.nextElementSibling.classList.add('d-none');
        }

    }
}