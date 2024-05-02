import {AuthServices} from "../services/auth-services";
import {AuthUtils} from "../utils/auth-utils";

export class Form {
    constructor(openNewRoute, page) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.processElement = null;

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^.*(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/,
                valid: false,
            }
        ];
        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[aA-zZаА-яЯ]+(?:\s?[aA-zZаА-яЯ]+)*$/,
                    valid: false,
                },
                {
                    name: 'password-repeat',
                    id: 'password-repeat',
                    element: null,
                    regex: null,
                    valid: false,
                }
            )
        }

        const that = this;
        this.processElement = document.getElementById('button');
        this.processElement.onclick = function () {
            that.validateForm();
            if (that.validateForm()) {
                that.processForm();
            }
        }
    }

    validateForm() {
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            if (!item.element.value || (item.regex && !item.regex.exec(item.element.value)) || (item.name === 'password-repeat' && item.element.value !== item.element.parentElement.previousElementSibling.children[1].value)) {
                item.element.classList.add('border-danger');
                item.element.nextElementSibling.classList.add('d-block');
                item.valid = false;
            } else {
                item.valid = true;
                item.element.classList.remove('border-danger');
                item.element.nextElementSibling.classList.remove('d-block');
                item.element.nextElementSibling.classList.add('d-none');
            }
        });

        const validForm = this.fields.every(item => item.valid);
        if (validForm) {
            return validForm;
        }
    }

    async processForm() {
        localStorage.clear();
        const email = this.fields.find(item => item.name === 'email').element;
        const password = this.fields.find(item => item.name === 'password').element.value;
        const passwordLabel = this.fields.find(item => item.name === 'password').element;
        passwordLabel.nextElementSibling.innerText = 'Неверный логин или пароль';

        if (this.page === "signup") {
            const modal = document.getElementById('modal');
            const modalBtn = document.getElementById('modal-btn');

            const result = await AuthServices.signup({
                name: this.fields.find(item => item.name === 'name').element.value,
                email: email.value,
                lastName: 'null',
                password: password,
                passwordRepeat: this.fields.find(item => item.name === 'password-repeat').element.value
            });

            if (result) {
                const that = this;
                modal.style.display = 'flex';
                modalBtn.addEventListener('click', function () {
                    return that.openNewRoute('/login');
                });
            }

        } else if (this.page === 'login'){
            const result = await AuthServices.login({
                email: email.value,
                password: password,
            });
            if (result) {
                AuthUtils.setAuthInfo(result.tokens.accessToken, result.tokens.refreshToken, JSON.stringify({
                    id: result.user.id,
                    name: result.user.name
                }));
                return this.openNewRoute('/');
            }
            email.classList.add('border-danger');
            passwordLabel.classList.add('border-danger');
            passwordLabel.nextElementSibling.classList.add('d-block');
            passwordLabel.nextElementSibling.classList.remove('d-none');
        }
    }
}