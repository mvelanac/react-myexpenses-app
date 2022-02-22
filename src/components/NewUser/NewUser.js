import NewUserForm from "./NewUserForm";
import './NewUser.css';
import Wrapper from "../Helpers/Wrapper";
import React from "react";

function NewUser(props) {

    const saveNewUserHandler = (newUser) => {
        const newUserData = {id : Math.random().toString(), ...newUser};
        props.onAddNewUser(newUserData);
    };

    return (
            <NewUserForm onSaveNewUser = {saveNewUserHandler}></NewUserForm>);
};

export default NewUser;