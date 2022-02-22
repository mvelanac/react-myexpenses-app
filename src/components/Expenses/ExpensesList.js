import ExpenseItem from "./ExpenseItem";

function ExpensesList(props) {

    if(props.expenses.length === 0){
        return <h2 className="expenses-list__falback">No expenses found.</h2>
    } else {
        return <ul className="expenses-list"> 
            {props.expenses.map(expense => 
                <ExpenseItem 
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount} 
                    date={expense.date}>
                </ExpenseItem>)}
    </ul>};
};

export default ExpensesList;