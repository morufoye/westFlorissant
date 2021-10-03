import React,  { useState } from 'react';
import Button from './Button';
import './FormInputStyle.css';
import Card from '../components/UI/Card';
import { useForm } from 'react-hook-form';

const LogIn = (props) => {

    const logInHandler = (data) => {
        props.onLogIn(data.username, data.password);
    };

    const { register, handleSubmit, formState: { errors },} = useForm ();


    return (
        <Card>
            <form className="form-login" onSubmit = {handleSubmit(logInHandler )}>
                <div className="form-control">
                    <label htmlFor="username" className="form-control label"> UserName</label>
                    <input {...register('username', { required: true })}/>
                    {errors.username && <p>Enter your username</p>}
                </div>
                <div className="form-control">
                    <label  className="form-control label" htmlFor="password"> Password</label>
                    <input type="password" {...register('password', { required: true })}/>
                    {errors.password && <p>enter password</p>}
                    </div>
                        <Button type="Submit">Log In</Button>

                    </form>
                        </Card>

                        );
                    }


                    export default LogIn;
