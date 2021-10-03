
import axios from "axios";
import React, {useState} from "react";
import classes from './MessageList.module.css';
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import classesModal from './ErrorModal.module.css';
import readIcon from './readIcon.png'
import unreadIcon from './unreadIcon.png'
import {Link, NavLink} from 'react-router-dom';
//import  useTable  from "react-table";
//import  {useTable}  from "react-table";
import './AllMessagesList.css'
//import {useTable} from "react-table/src/hooks/useTable";
import {useTable} from "react-table/src/hooks/useTable";

const AllMessagesList = (props) => {

    const baseURL ="http://localhost:8083";
    const[messagesList, setMessagesList] = useState([]);

    const columns = React.useMemo(
         () => [
             {
                 Header: 'Sender',
                 accessor: 'sender',
             },
             {
                 Header: 'Subject',
                 accessor: 'subject',
             },
             {
             Header: 'Date',
               accessor: 'date_sent',
          },
             {
                Header: 'Status',
                 accessor: 'is_opened',
         }
        ],
        []
   )


    const closeButton = {
        background: "#f60227",
        color: "white",
        float: "right",
        marginTop: "0px",
    };

    const iconLogo = {
        height: '2vmin',
        pointerEventsvents: 'none',
    }
    const readiconLogo = {
        height: '3vmin',
        pointerEventsvents: 'none',
    }

    const closeInbox = () =>{
        props.closeInbox();
    }

    const returnHome = () => {
        props.returnHome();
    }


    React.useEffect(() => {
        let isActive = true;
        axios.get(`${baseURL}/allMessages/${props.userId}`).then((response) => response.data
        ).then((data) => {
            if (isActive) {
                setMessagesList(data);
                //console.log(JSON.stringify(data));
            }
        }).catch((error) => console.log(error.message));
        return () => {
            isActive = false;
        };
    }, []);

    const data = React.useMemo(() => messagesList, []);

   /* const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });*/


    const MessageItem = (props) => {
        let opened = false;
        if (props.is_opened === 'Y') {
            opened = true;
        }
        //    return (
           /*     <li className={classes.item}>
                    <p>{props.sender}</p>
                    <p>
                        <Link  to={`/messageDetail/${props.message_id}`}  onClick={closeInbox} style={{fontSize : "15px", color : "red"}}>
                        {props.subject}
                        </Link>
                    </p>
                    <p>{props.date_sent}</p>
                    <p>{ opened ?  <img src={readIcon} style={readiconLogo}/> :  <img src={unreadIcon} style={iconLogo}/>}</p>
                </li>*/
       //     );
    }


    return (
        <Modal>
            <header className={classesModal.header}>
                <h2>Message Inbox</h2>
                <button style={closeButton} onClick={returnHome}>cancel</button>
            </header>
           {/* <ul className={classes.list}>
            {messagesList.map((info) => (<MessageItem
                message_id = {info.message_id}
                sender = {info.sender}
                subject = {info.subject}
                date_sent = {info.date_sent}
                is_opened = {info.is_opened}
                />
                ))}

            </ul>*/}

      {/*      <table {...getTableProps()}  id='messageList'>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        { headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                { rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        { cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
*/}
        </Modal>
    );



};
export default AllMessagesList;