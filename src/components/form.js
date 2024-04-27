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
            console.log(1)
        } else {
            console.log(0)
        }
    }

    async processForm() {
        // if (this.validateForm()) {
        //
        // } else {
        // }
    }
}