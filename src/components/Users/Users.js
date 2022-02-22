import React from "react";
import styles from './Users.module.css';
import Card from '../../UI/Card.js';

function Users (props) {

    return (<Card className={styles.users}> 
            <ul>
                { props.users.map(user => (
                    <li key = {user.id}>
                        <div>
                            <div>{user.username}: {user.age}</div>
                        </div>
                    </li>))}
            </ul>
        </Card>
        
    );
};

export default Users;