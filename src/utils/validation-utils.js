export class ValidationUtils {
    static validate(fields) {
        let validate = [];

        fields.forEach(item => {
            if (!item.value || item.value === '') {
                item.classList.add('border-danger');
                item.classList.add('focus-ring-danger');
                validate.push(false);
            } else {
                item.classList.remove('border-danger');
                item.classList.remove('focus-ring-danger');
                validate.push(true);
            }
            if (item.value < 0) {
                item.value = parseInt(item.value.toString().replace('+', '').replace('-', ''));
            }
        });

        let validateResult = validate.some(item => item === false);

        return !validateResult;
    }
}