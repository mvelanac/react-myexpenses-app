import React, {useState, useRef} from 'react';
import Card from '../../UI/Card';
import './NewUserForm.css';
import Button from '../../UI/Button';
import ErrorModal from '../../UI/ErrorModal';


function NewUserForm(props) {

    const usernameInputRef = useRef();
    const ageInputRef = useRef();

    // const[enteredUsername, setEnteredUsername] = useState('');
    // const[enteredAge, setEnteredAge] = useState('');
    const[error, setError] = useState('');

    // const changeUsernameHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // }
    // const changeAgeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // }

    const submitUserForm = (event) => {
        event.preventDefault();

        const enteredUsername1 = usernameInputRef.current.value;
        const enteredAge1 = ageInputRef.current.value;

        if(enteredUsername1.trim().length ===0 || enteredAge1.trim().length===0){
            setError({
                title: 'Invalid input.',
                errorMessage: 'Please enter valid username'
            });
            return;
        }
        if(+enteredAge1 < 1){
            setError({
                title: 'Invalid input.',
                errorMessage: 'Please enter valid age'
            });
            return;
        }

        const enteredData = {username: enteredUsername1, age: enteredAge1};
        props.onSaveNewUser(enteredData);

        usernameInputRef.current.value = '';
        ageInputRef.current.value = '';
        // setEnteredUsername('');
        // setEnteredAge('');
    }

    const errorHandler = (props) => {
        setError(null);
    }

    return (
        <div className="new-user">
            { error && <ErrorModal title={error.title} errorMessage={error.errorMessage} onConfirm={errorHandler}/>}
            <Card>
                <form onSubmit={submitUserForm}>
                    <div className='new-user__controls'>
                        <div className='new-user__control'>
                            <label>Username:</label><input ref={usernameInputRef} type='text' 
                                    // value={enteredUsername} onChange={changeUsernameHandler}
                                    ></input>
                        </div>
                        <div className='new-user__control'>
                            <label>Age:</label><input ref={ageInputRef} type='number' 
                                        // value={enteredAge} onChange={changeAgeHandler}
                                        ></input>
                        </div>
                    </div>
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>);
};

export default NewUserForm;