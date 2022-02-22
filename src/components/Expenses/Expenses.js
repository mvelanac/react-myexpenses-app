import './Expenses.css';
import Card from "../../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react/cjs/react.development";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {

    const[filteredYear, setFilteredYear] = useState('2020');

    const handleOnChangeFilter = (selectedYear) => {
        setFilteredYear(selectedYear);
    }

    const filteredExpenses = props.expenses.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear; 
    });

    return (
       
        <Card className="expenses">
            <ExpensesFilter selected={filteredYear} onChangeFilter={handleOnChangeFilter}/>
            <ExpensesChart expenses = {filteredExpenses}></ExpensesChart>
            <ExpensesList expenses = {filteredExpenses}/>
        </Card>
    );
}

export default Expenses;