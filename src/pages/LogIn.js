import React,  { useState } from 'react';
import Button from './Button';
import './FormInputStyle.css';
import Card from '../components/UI/Card';

const LogIn = (props) => {
    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');

    const logInHandler = (event) => {
        event.preventDefault(); 
       
      props.onLogIn(userName, password);
       setUserName("");
       setPassword("");
     };
    
    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    };
     const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    
    return (
        <Card>
        <form className="form-login" onSubmit = {logInHandler}>
        <div className="form-control">
             <label htmlFor="username" className="form-control label"> UserName</label>
             <input className="form-control input" id="username" type="text" value={userName} onChange={userNameChangeHandler} required></input>
        </div> 
        <div className="form-control">    
             <label  className="form-control label" htmlFor="password"> Password</label>
             <input  className="form-control input" id="pass" type="password" value={password} onChange={passwordChangeHandler} required/>
             <Button type="sbbmit">Log In</Button>
         </div>
       </form>
       </Card>
   
   );    
}


export default LogIn;