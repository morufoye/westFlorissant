

import { useState} from 'react';
import Button from './Button';
import classes from './ErrorModal.module.css';
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";

const ChangePassword= (props) => {

    let passwordChangeObject = {};

    const[oldPassword, setOldPassword] = useState('');
    const[password, setPassword] = useState('');
    const[passwordConfrim, setPasswordConfirm] = useState('');

    const changePasswordHandler= (event) => {
        event.preventDefault();

        passwordChangeObject = {
            "oldPassword": oldPassword,
            "password": password,
        }


        if (password === passwordConfrim) {
            props.completeTask();
            alert("password change successful");
        }else {
            alert("passwords do not match");
        };



    }


    const oldPasswordChangeHandler = (event) => {
        setOldPassword(event.target.value);
        let OldPassword = {"oldPassword": event.target.value};
        passwordChangeObject = {oldPassword, ...passwordChangeObject};
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        let password = {"password": event.target.value};
        passwordChangeObject = {oldPassword, ...passwordChangeObject};
    };

    const passwordConfirmChangeHandler = (event) => {
        setPasswordConfirm(event.target.value);
    };


    return (
        <Modal onClose={props.completeTask}>
                <header className={classes.header}>
                    <h2>Change Password</h2>
                </header>
                <div className={classes.content}>
                    <form className="form" onSubmit = {changePasswordHandler}>
                        <div className="form-control">
                            <label className="form-control label"  htmlFor="oldPassword">Current Password</label>
                            <input className="form-control input" id="phone" type="password" value={oldPassword} onChange={oldPasswordChangeHandler} required/>
                        </div>

                        <div className="form-control">
                            <label className="form-control label"  htmlFor="password">New Password</label>
                            <input className="form-control input" id="password" type="password" value={password} onChange={passwordChangeHandler} required/>
                        </div>

                        <div className="form-control">
                            <label className="form-control label"  htmlFor="passwordConfirm">Confrim Password</label>
                            <input className="form-control input" id="phone" type="password" value={passwordConfrim} onChange={passwordConfirmChangeHandler} required/>
                        </div>
                        <Button type="sbbmit">Submit</Button>
                    </form>

                </div>


        </Modal>
    );
};

export default ChangePassword;

