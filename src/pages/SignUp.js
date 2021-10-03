import React, {useEffect, useState} from 'react';
import {Fragment} from "react";
import './FormInputStyle.css'
import Card from '../components/UI/Card';
import classes from "./ErrorModal.module.css";
import { useForm } from 'react-hook-form';
import './SignUpForm.css';
import axios from "axios";
import loadingGif from './loadingGif.gif';


const SignUp = (props) => {
    let url = "http://localhost:8083/profilePix/"+ props.userId;
    const { register, handleSubmit, formState: { errors },} = useForm ();
    const [picture, setPicture] = useState();
    const [profilePixUrl, setProfilePixUrl] = useState(url);
    const [memberData, setMemberData] = useState({});
    //const [profilePixUrl, setProfilePixUrl] = useState(profilePix);

    const handleFile = (event) => {
        let pix = event.target.files[0];
        setPicture(pix);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", picture, props.userId);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            url =  "http://localhost:8083/uploadProfilePix/"+ props.userId;
            axios.post(url, formData, config);
            setProfilePixUrl(loadingGif);
             setTimeout(function() {
                setProfilePixUrl("http://localhost:8083/profilePix/"+ props.userId)
             }, 4000);
        } catch(error) {
            console.error(error);
        }
    };


     useEffect(() => {
         axios.get(`http://localhost:8083/getRegisteredMember/${props.userId}`).then((response) => response.data
         ).then((data) => {
             setMemberData(data);
         }).catch((error) => console.log(error.message));
     }, []);


    const submitButton = {
        font: "inherit",
        background: "#2c6e02",
        color: "white",
    };

    const closeButton = {
        background: "#f30505",
        color: "white",
        float: "right",
        marginTop: "0px",
    };
    let formLeftDiv = {};
    if (props.profileEdit) {

        //setProfilePixUrl(url);
        formLeftDiv = {
            width: "60%", float:"left",
        }
    }

    const formRightDiv = {
        width: "30%", float:"right",
    };


    const pixLogo = {
        height: '36vmin',
        pointerEventsvents: 'none',
    }

    const addUserHandler = (data) => {

        if (!props.profileEdit) {
            if (data.password === document.getElementById('passwordConfrim').value) {
                props.onRegister(data);
                // save user
            }else {
                alert("passwords do not match");
            };

        } else {
            //post update
            alert('over here ' +  data.email);
            props.onFinish();
        }
    }

         const closeEditProfile = () => {
             props.onFinish();
         };

    const returnToLoginPage = () => {
        window.location = '/welcome';
    };

    return (


       <Fragment>
                <header className={classes.header}>
                    { props.profileEdit ? <div><h2>Edit Profile </h2><button style={closeButton} onClick={closeEditProfile}>close</button></div> : <div><h2>Registration Form</h2><button style={closeButton} onClick={returnToLoginPage}>close</button></div>}
                </header>

           <Card style={formLeftDiv}>
                <form  onSubmit = {handleSubmit(addUserHandler)}>

                    <table>
                    { !props.profileEdit &&
                        <tr>

                        <td><span>Username</span></td>
                        <td><input {...register('username', { required: true })}/></td>
                        {errors.username && <p>This field is required</p>}

                        </tr>
                    }

                        <tr>
                            <td><span>Title</span></td>
                            <td><select value={memberData.title} {...register('title')}>
                                <option value="">Select one</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Alh">Alh</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                                <option value="Chief">Chief</option>
                            </select></td>
                        </tr>

                        <tr>
                        <td><span>First Name</span></td>
                        <td><input value={memberData.firstname} {...register('firstname', { required: true })}/></td>
                        {errors.firstname && <p>This field is required</p>}
                        </tr>




                   <tr>
                     <td> <span>Last Name</span></td>
                       <td>   <input value={memberData.lastname} {...register('lastname', { required: true })}/></td>
                        {errors.lastname && <p>This field is required</p>}
                   </tr>




                        <tr>
                            <td> <span>Middle Name</span></td>
                        <td><input value={memberData.middlename} {...register('middlename')}/></td>
                        </tr>



                    <tr>
                        <td><span>Residential Address</span></td>
                        <td><input value={memberData.address} {...register('address')}/></td>
                    </tr>



                    <tr>
                        <td><span>Email Address</span></td>
                            <td><input value={memberData.email} {...register('email')} /></td>

                    </tr>



                        <tr>
                            <td><span>Phone Number</span></td>
                                <td><input value={memberData.phone} {...register('phone')}/></td>

                            </tr>

                        <tr>
                            <td><span>Occupation</span></td>
                            <td><input value={memberData.occupation} {...register('occupation')}/></td>

                        </tr>



            <tr>
                <td><span>Marital Status</span></td>
                    <td><select value={memberData.marital_status} {...register('marital_status')}>
                    <option value="">Select one</option>
                    <option value="single">Sindgle</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="seperated">Seperated</option>
                </select></td>

            </tr>



            <tr>
                <td><span>Gender</span></td>
                <td><select value={memberData.gender} {...register('gender')}>
                    <option value="">Select one</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select></td>
            </tr>




            {!props.profileEdit &&
            <div>
                    <tr>
                        <td><span>Password</span></td>
                            <td><input type="password" {...register('password')}/></td>
                        {errors.password && <p>This field is required</p>}

                    </tr>

                <tr>
                    <td><span>Confrim Password</span></td>
                        <td><input type="password" id="passwordConfrim" required/></td>
                </tr>
            </div>
                    }
                      <tr> <td> <button type="submit" style={submitButton}>Submit</button> </td>
                      </tr>
                    </table>

                </form>
      </Card>
           {props.profileEdit &&
           <Card style={formRightDiv}>
               <img src={profilePixUrl} style={pixLogo} alt="Please Upload Pix"/>
               <form onSubmit={handleUpload}>
                   <input type="file" onChange={handleFile} required/>
                   <button type="submit">Upload</button>
               </form>
           </Card>
           }
       </Fragment>
                );
            }


            export default SignUp;