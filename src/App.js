import React, {useState, useContext} from 'react';
import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpence/NewExpense';
import NewUser from './components/NewUser/NewUser';
import Users from './components/Users/Users';
import MainHeader from './components/MainHeader/MainHeader.js';
import Login from './components/Login/Login.js';
import Home from './components/Home/Home.js';
import AuthContext from './context/auth-context';
import { AuthContextProvider } from './context/auth-context';

const initial_expenses = [
  { id: 'id1', title: 'Car Insurance', amount: 294.67, date: new Date(2022, 1, 3) },
  { id: 'id2', title: 'Fruits', amount: 94.67, date: new Date(2022, 1, 4) },
  { id: 'id3', title: 'Cosmetics', amount: 122.67, date: new Date(2022, 1, 6) },
  { id: 'id4', title: 'Food', amount: 657.67, date: new Date(2022, 1, 5) }

];

const initial_users = [];

function App() {

  const [expenses, setExpenses] = useState(initial_expenses);

  const addExpenseHandler = (newExpense) => {
    //update state that depends on previous state
    console.log(newExpense);
      setExpenses(prevExpenses => 
        { return [newExpense, ...prevExpenses]});
  };

  const[users, setUsers] = useState(initial_users);

  const addNewUserHandler = (newUser) => {
    setUsers( prevUsers => {return [newUser, ...prevUsers]});
  }
  
  const ctx = useContext(AuthContext);
  return (
      <>
      {/* <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses expenses = {expenses}/> */}
      {/* <NewUser onAddNewUser={addNewUserHandler}></NewUser>
      <Users users = {users}></Users> */}

      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>   
      </>
  );
}

export default App;
