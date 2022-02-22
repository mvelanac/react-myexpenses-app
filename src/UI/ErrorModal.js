import React from "react";
import Button from "./Button";
import Card from "./Card";
import styles from './ErrorModal.module.css';
import ReactDOM from "react-dom";


function Backdrop (props) {
    return <div className={styles.backdrop} onClick={props.onConfirm}></div>;
   
};

function ModalOverlay (props) { 
    return <Card className={styles.modal}>
            <header className={styles.header}><h2 className={styles.title}>{props.title}</h2></header>
            <div className={styles.content}><p className={styles.message}>{props.errorMessage}</p></div>
            <footer className={styles.actions}><Button onClick={props.onConfirm}>Okay</Button></footer>
            </Card>;
};


function ErrorModal(props){

    return (
    
    <React.Fragment>
       {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}/>, document.getElementById('backdrop-root'))}
       {ReactDOM.createPortal(<ModalOverlay onConfirm={props.onConfirm} title={props.title} errorMessage={props.errorMessage}/>, document.getElementById('modal-root'))}
    </React.Fragment>
    );
};

export default ErrorModal;