import React, {Fragment} from 'react';
import Card from '../components/UI/Card';
import './Homepage.css';
import ChangePassword from "./ChangePassword";
import { useState } from 'react';
import SignUp from "./SignUp";
import axios from "axios";
import ComposeMessage from "./ComposeMessage";
import AllMessagesList from "./AllMessagesList";
import {Route} from "react-router-dom";
import MessageDetail from "./MessageDetail";

const Homepage = (props) => {
    const baseURL ="http://localhost:8083";


     const[pwordModal, setPwordModal] = useState(false);
     const[editUserModal, setEdtUserModal] = useState(false);
     const[compMessage, setCompMessage] = useState(false);
     const[resp, setResp] = useState({});
     const[messageType, setMessageType] = useState(false);
     const[inboxPage, setInboxPage] = useState(false);
     const[showHome, setShowHome] = useState(true);

     //let members_count, contributions_count, messages_count, request_count= "0";

    React.useEffect(() => {
       let isActive = true;
        axios.get(`${baseURL}/loadHomepageWidgetCount/${props.user}`).then((response) => response.data
        ).then((data) => {
            if (isActive) {
                setResp(data);
            }
        }).catch((error) => console.log(error.message));

         return () => {
             isActive = false;
         };
    }, []);

      function showEditUser() {
          setEdtUserModal(true);
      }

    function showInbox() {
        setInboxPage(true);
    }

    function returnHome() {
        setInboxPage(false);
    }

    function closeInbox() {
        setInboxPage(false);
        setShowHome(false);
    }

    const closeMessageBody = () => {
        setShowHome(true);
    }

     function hideEditUser() {
        setEdtUserModal(false);
     }

     function showPwordChangeModal () {
         setPwordModal(true);
     };

    const passwordChangeComplete = () => {
        setPwordModal(false);
    };

    const doneSendingMessage = () => {
        setCompMessage(false);
    }

    const showMessageComposer = ()  => {
        setMessageType(false);
        setCompMessage(true);
    }

    const refreshHomePage = () => {
        setShowHome(true);
       // props.refreshHomePage(props.user);
    }

    const showMessageComposerForAnnouncement = ()  => {
        setMessageType(true);
        setCompMessage(true);
    }

    const leftMenuStyle = {
        borderTop: "20px",
        width: "100%",
        float: "left",
        margin: " 0px",
        list: "none",
        text: "none",
        position: "relative",
        paddingLeft: "0px",
    };

    const dialogStyle = {
        borderTop: "20px",
        width: "100%",
        float: "center",
        margin: " 0px",
        list: "none",
        text: "none",
        position: "relative",
        paddingLeft: "0px",
    };



    const numberStyle = {
        fontSize: "50px",
        fontWeight: "bold",
    };


    const title = {
        fontSize: "20x",
        fontWeight: "bolder",
        margin: "5px",
        lineHeight: "20px",
        textTransform: "uppercase",
    };


const subTitle = {
        fontSize: "12px",
        fontWeight: "lighter",
        margin: "5px",
        lineHeight: "15px",
    };



    const widget_data = {
        paddingLeft: "80px",
    };

const widget = {
        width: "100",
        float: "left",
        margin: "15px",
        listStyle: "none",
        mozBoxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.2)",
        webkitBboxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.2)",
        boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.2)",
        mozBorderRadius: "5px",
        webkitBorderRadius: "5px",
        borderRadius: "5px",
        padding: "15px 10px",
        marginBottom: "20px",
        minHeight: "120px",
        position: "relative",
        color: "firebrick",
    };

  const profileEdit = true;

 return (
   <Fragment>
       {inboxPage && <AllMessagesList  userId={props.user}  closeInbox={closeInbox} returnHome={returnHome}/>}
       {compMessage && <ComposeMessage messagTaskDone={doneSendingMessage} closeBox={doneSendingMessage} userId={props.user} typeOfMessage={messageType}/>}
       {pwordModal && <ChangePassword completeTask={passwordChangeComplete}/>}
       {editUserModal && <SignUp profileEdit={profileEdit} userId={props.user} onFinish={hideEditUser}/>}
       { (!editUserModal && showHome) &&

           <Card>
           <table>
           <tr>
           <td>
           <div style={widget}>
           <div style={widget_data}>
           <div style={numberStyle}><strong>{resp.members_count}</strong></div>
           <div style={title}><strong>Total Members</strong></div>
           <div style={subTitle}>View Details</div>
           </div>
           </div>
           </td>

           <td>
           <div style={widget}>
           <div style={widget_data}>
           <div style={numberStyle}><strong>{resp.request_count}</strong></div>
           <div style={title}>Pending Requests</div>
           <div style={subTitle}>View Details</div>
           </div>
           </div>
           </td>

           <td>
           <div style={widget}>
           <div style={widget_data}>
           <div style={numberStyle}><strong>{resp.messages_count}</strong></div>
           <div style={title}>Unread Messages</div>
           <div style={subTitle}><li><a href="#" onClick={showInbox}>Inbox</a></li></div>
           </div>
           </div>
           </td>


           <td>
           <div style={widget}>
           <div style={widget_data}>
           <div style={numberStyle}><strong>{resp.contributions_count}</strong></div>
           <div style={title}>Active Contributions</div>
           <div style={subTitle}>View Details</div>
           </div>
           </div>
           </td>
           </tr>
           </table>

           <div style={leftMenuStyle}>
           <div style={widget}>
           <div style={widget_data} style={{backgroundColor : "white"}}>

           <ui>
           <li><a href="#" style={{color : "#8b005d"}} onClick={showPwordChangeModal}>Change Password</a></li>
           <li><a href="#" style={{color : "#8b005d"}} onClick={showEditUser}>Edit Profile</a></li>
           <li><a href="#" style={{color : "#8b005d"}} onClick={showMessageComposer}>Send Message</a></li>
           <li><a href="#" style={{color : "#8b005d"}} onClick={showMessageComposerForAnnouncement}>Post Annoucement</a></li>
           </ui>

           </div>
           </div>
           </div>


           </Card>


       }
       <Route path='/messageDetail/:message_id' exact>
           <MessageDetail refreshHomePage={refreshHomePage}/>
       </Route>
  </Fragment>
 );
};

export default Homepage;