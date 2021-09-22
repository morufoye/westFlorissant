import React,  { useState } from 'react';
import Button from './Button';
import './FormInputStyle.css';
import Card from '../components/UI/Card';


const SignUp = (props) => {



    let
        registerObject = {};

    const[userName, setUserName] = useState('');

    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[address, setAddress] = useState('');

    const[email, setEmail] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const[password, setPassword] = useState('');
    const[passwordConfrim, setPasswordConfirm] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault(); 
       
         registerObject = {
             "username": userName,
             "firstname": userName,
             "lastname": lastname,
             "address": address,
             "email": email,
             "phone": phoneNumber,
             "password": password,
         }

        if (password === passwordConfrim) {
            console.log('register object kkkkkk' + registerObject.value);
            props.onRegister(registerObject);
            setUserName('');
           }else {
             alert("passwords do not match");    
        };
           
        }
     
    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    };
     const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const firstnameChangeHandler = (event) => {
        setFirstname(event.target.value);
    };
    const lastnameChangeHandler = (event) => {
        setLastname(event.target.value);

    };
    const addressChangeHandler = (event) => {
        setAddress(event.target.value);


    };

    const phoneChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
        let phone = {"phone": event.target.value};
        registerObject = {phone, ...registerObject};
    };
   

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        let password = {"password": event.target.value};
        registerObject = {password, ...registerObject};
    };

    const passwordConfirmChangeHandler = (event) => {
        setPasswordConfirm(event.target.value);
    };
    
    return (
        <Card>
        <form className="form" onSubmit = {addUserHandler}>
        <div className="form-control">
             <label className="form-control label" htmlFor="username"> Username</label>
             <input className="form-control input" id="username" type="text" value={userName} onChange={userNameChangeHandler} required></input>
        </div>

            <div className="form-control">
                <label className="form-control label" htmlFor="firstname"> First Name</label>
                <input className="form-control input" id="firstname" type="text" value={firstname} onChange={firstnameChangeHandler} required></input>
            </div>

            <div className="form-control">
                <label className="form-control label" htmlFor="lastname"> Last Name</label>
                <input className="form-control input" id="lastname" type="text" value={lastname} onChange={lastnameChangeHandler} required></input>
            </div>

            <div className="form-control">
                <label className="form-control label" htmlFor="address">Residential Address</label>
                <input className="form-control input" id="address" type="text" value={address} onChange={addressChangeHandler} required></input>
            </div>

        <div className="form-control">
             <label className="form-control label"  htmlFor="email"> Email address</label>
             <input className="form-control input" id="email" type="text" value={email} onChange={emailChangeHandler} required/>
        </div>
        <div className="form-control">
             <label className="form-control label"  htmlFor="phoneNumber">Phone Number</label>
             <input className="form-control input" id="phone" type="text" value={phoneNumber} onChange={phoneChangeHandler} required/>
        </div>

        <div className="form-control">
             <label className="form-control label"  htmlFor="password">Password</label>
             <input className="form-control input" id="password" type="password" value={password} onChange={passwordChangeHandler} required/>
        </div>

        <div className="form-control">
             <label className="form-control label"  htmlFor="passwordConfirm">Confrim Password</label>
             <input className="form-control input" id="phone" type="password" value={passwordConfrim} onChange={passwordConfirmChangeHandler} required/>
        </div>
         <Button type="sbbmit">Submit</Button>
         </form>
         </Card>
   
   );    
}


export default SignUp;