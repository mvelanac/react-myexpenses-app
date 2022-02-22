import React, { useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../../UI/Card';
import classes from './Login.module.css';
import Button from '../../UI/Button.js';
import Input from '../../UI/Input.js';
import AuthContext from '../../context/auth-context';


// useEffect(() => {
//   // ako je prazan niz uslova ovo se izvrsava samo prvi put kada se ucita komponenta
//   // ako niz nije prazan ovo se izvrsava svaki put kada se promeni dependecy
//   console.log('EFFECT RUNNING');
//   // ako je prazan niz uslova ovo se izvrsava samo kada se napusti komponenta
//   // ako niz nije prazan ovo se izvrsava nakon svake funkcije u useEffect
//   return () => { 
//     console.log('EFFECT CLEANUP')};
// }, []);

const emailReducer = (prevState, action) => {
    if(action.type === 'USER_INPUT') {
      return {value: action.value, isValid: action.value.includes('@')};
    } 
    if(action.type === 'INPUT_BLUR') {
      return {value: prevState.value, isValid: prevState.value.includes('@')};
    }
    return {value: prevState.value, isValid: false};
};

const passwordReducer = (prevState, action) => {
    if(action.type === 'USER_INPUT'){
      return {value: action.value, isValid: action.value.trim().length > 6};
    }
    if(action.type === 'INPUT_BLUR'){
      return {value: prevState.value, isValid: prevState.value.trim().length > 6};
    };
    return {value: prevState.value, isValid: false};
};

const Login = (props) => {

  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState(false);
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false}); 
  const[emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});

  const{isValid: emailIsValid} = emailState;
  const{isValid: passwordIsValid} = passwordState;

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setFormIsValid(emailIsValid && passwordIsValid);
        console.log('Check is form valid.');
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        console.log('CLEANED UP.');
      };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', value: event.target.value});
    setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', value: event.target.value});
    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR' });
  };


  const emailRef = useRef();
  const passRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){
      emailRef.current.focus();
    } else {
      passRef.current.focus();
    }
  };

 
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}> 

        <Input ref={emailRef} id="email" type="email" label="Email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} isValid={emailState.isValid}></Input>

        <div className={`${classes.control} ${ passwordState.isValid === false ? classes.invalid : '' }`} >
          <label htmlFor="password">Password</label>
          <input ref={passRef} type="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default Login;
