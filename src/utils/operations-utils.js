export class OperationsUtils {
    static async checkOperations(operations) {
        try {
            let expense = await operations.operations.filter(item => item.type === 'expense');
            let income = await operations.operations.filter(item => item.type === 'income');

            const [commonExpense, dataCategoryExpense, dataAmountExpense] = this.mergerOperations(expense);
            const [commonIncome, dataCategoryIncome, dataAmountIncome] = this.mergerOperations(income);

            return [expense, income, dataAmountExpense, dataCategoryExpense, dataAmountIncome, dataCategoryIncome];
        } catch (e) {
            console.log(e);
        }
    }
    static mergerOperations (result) {
        let common = [],
            arr=[],
            dataAmount =[],
            dataCategory =[];

        if (result && result.length > 0) {
            result.forEach(item => {
                if (arr[item.category]) {
                    arr[item.category].amount += item.amount;
                } else {
                    arr[item.category] = {
                        amount: item.amount
                    };
                }
            });

            for (let x in arr) {
                common.push({
                    category: x,
                    amount: arr[x].amount
                })
            }
        }

        common.forEach(item => {
            dataAmount.push(item.amount);
            dataCategory.push(item.category);
        });

        return [common, dataCategory, dataAmount];
    }
}