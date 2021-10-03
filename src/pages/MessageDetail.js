import {Link, useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, Fragment} from "react";
import Card from "../components/UI/Card";
import classesForm from "./MessageSender.module.css";
import classes from "./ErrorModal.module.css";
import  CloseIcon from './closeIcon.png';
import unreadIcon from "./unreadIcon.png";

const MessageDetail = (props) => {
    const params = useParams();
    const[loadedMessage, setLoadedMessage] = useState({});
    const { message_id } = params;
    const baseURL ="http://localhost:8083";
    const closeLink = {
        background: "#f30505",
        color: "white",
        float: "right",
        marginTop: "0px",
    };
    const closeLogo = {
        height: '2vmin',
        width: "4vmin",
        pointerEventsvents: 'none',
    }

    const closeMessageBody = () => {
       props.refreshHomePage();
    }

    React.useEffect(() => {
        let isActive = true;
        axios.get(`${baseURL}/getMessageDetail/${message_id}`).then((response) => response.data
        ).then((data) => {
            if (isActive) {
                setLoadedMessage(data);
            }
        }).catch((error) => console.log(error.message));
        return () => {
            isActive = false;
        };
    }, []);
    return (
        <Fragment>
        <header className={classes.header}>
        <h2>Message Posted on : <div style={{fontSize: "15px"}}>{loadedMessage.date_sent}</div></h2>
            <Link  to={`/login`}  onClick={closeMessageBody}style={closeLink}>
                <img src={CloseIcon} style={closeLogo}/>
            </Link>
        </header>
       <Card>
          <form>
                 <table>
                    <tr><td>Sender:</td><td><div style={{color : "red", fontSize: "15px"}}>{loadedMessage.sender}</div></td></tr>
                     <tr><td>Subject:   </td><td><div style={{color : "red", fontSize: "20px"}}>{loadedMessage.subject}</div></td></tr>
                 </table>
              <div className={classesForm.control}>
                  <textarea id='text' rows='8' cols='75'  value={loadedMessage.body}/>
              </div>

          </form>


       </Card>
        </Fragment>
    );
};

export default MessageDetail;