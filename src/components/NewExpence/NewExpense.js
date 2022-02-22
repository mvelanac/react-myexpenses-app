import ExpenseForm from './ExpenseForm.js';
import './NewExpense.css';

function NewExpence(props){

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            id: Math.random().toString(),
            ...enteredExpenseData
        };
        
        props.onAddExpense(expenseData);
    };

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    );
}

export default NewExpence;