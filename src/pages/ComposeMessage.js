import { useForm } from 'react-hook-form';
import Card from '../components/UI/Card';
import React, {useState} from "react";
import classes from './ErrorModal.module.css';
import Modal from "../components/UI/Modal";
import classesForm from './MessageSender.module.css';
import axios from "axios";
import loadingGif from "./loadingGif.gif";
import async from "async";

const closeButton = {
    background: "#f60227",
    color: "white",
    float: "right",
    marginTop: "0px",
};

const attachFile = {
    background: "#4a7c26",
    color: "white",
    float: "left",
    marginTop: "0px",
};

const ComposeMessage = (props) => {
    const baseURL ="http://localhost:8083";
    const[usernames, setUsernames] = useState([]);
    React.useEffect(() => {
        let isActive = true;
        axios.get(`${baseURL}/usernames/${props.userId}`).then((response) => response.data
        ).then((data) => {
            if (isActive) {
                setUsernames(data);
            }
        }).catch((error) => console.log(error.message));
        return () => {
            isActive = false;
        };
    }, []);

    const handleFile = (event) => {
       event.preventDefault();
        let pix = event.target.files[0];
        const iterator1 = usernames.values();
        let message_id =  iterator1.next().value.message_id;
        try {
            const formData = new FormData();
            formData.append("file", pix, props.userId);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            const url =  "http://localhost:8083/uploadMessagePix/"+ message_id;
            axios.post(url, formData, config).then((response) => response.data
            ).then((data) => {
             console.log(JSON.stringify(data));
            }).catch((error) => console.log(error.message));
            let loadingDiv = document.getElementById("fileUploading");
            loadingDiv.innerHTML = "File attaching.......... please wait"
            setTimeout(function() {
                loadingDiv.innerHTML = "File attached"; }, 3000);
        } catch(error) {
            console.error(error);
        }
    };

    const sendMessage = (data) => {
       if (data.destination === " " ) {
         alert("Please select the message recipient");
       } else{
           let message_id =  usernames.values().next().value.message_id;
           axios.post(`${baseURL}/sendMessage/${props.userId}/${message_id}`,data).then((response) => {
              alert(response.data.responseMessage);
           });
           props.messagTaskDone();
       }
    }

    const closeComposeBox = () => {
        props.closeBox();
    }

    const { register, handleSubmit, formState: { errors },} = useForm ();
    return (
        <Modal>
        <header className={classes.header}>
            { props.typeOfMessage ? <h2>General Announcement</h2> : <h2>Compose Message</h2>}


            <button style={closeButton} onClick={closeComposeBox}>cancel</button>
        </header>
        <div className={classes.content}>
        <form onSubmit = {handleSubmit(sendMessage)}>
            <div className={classesForm.control}>
                <label htmlFor='destination'>Message To</label>
                { props.typeOfMessage ? <input value="All Members" {...register('destination')}/>
                    : <div>
                    <select {...register('destination')}>
                    <option value=" ">. Select Message Recipient .</option>
                {usernames.map(names => (
                    <option key={names.recipients} value={names.recipients}>{names.recipients}</option>))};
                    </select>
                    </div>
                }

            </div>

            <div  className={classesForm.control}>
                <label htmlFor='text'>Subject</label>
                <input type="text" {...register('subject' , {required: true})}></input>
                {errors.subject && <p>Subject should not be empty</p>}
            </div>

            <div className={classesForm.control}>
                <label htmlFor='text'>Message Body</label>
                <textarea id='text' rows='8' cols='75' {...register('message_body' , {required: true})}></textarea>
                {errors.message_body && <p>You can not send empty message</p>}
            </div>
              <div className={classesForm.control}>
                  <input type="file" onChange={handleFile} required/>
                  <div id="fileUploading"></div>
              </div>
                <button type="submit" className="btn">Send</button>
        </form>
        </div>
            </Modal>
    );
};

export default ComposeMessage;