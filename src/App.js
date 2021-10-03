import  {Route, Switch, Redirect }  from  'react-router-dom';
import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Homepage from './pages/Homepage';
import Layout from './components/layout/Layout'
import axios from "axios";
import MessageDetail from "./pages/MessageDetail";

function App() {
    const baseURL ="http://localhost:8083";



  const [userId, setUserId] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [post, setPost] = useState(null);

    //   useEffect(() => {
    //     axios.get(`${baseURL}/registerMember`).then((response) => {
    //         setPost(response.data);
    //     });
    // }, []);

    function registerMember(postData) {
        axios.post(`${baseURL}/registerMember`,postData)
            .then((response) => {
                setPost(response.data);
            });
    }

 
  const addUserHandler = (registerUserObject) => {
        registerMember(registerUserObject);
    alert('Assalam alaykum wa rahmotullahi, a mail has been sent to ' + registerUserObject.email + ' please log in to validate your account');
    window.location.href = './welcome';
  };

const logInHandler = (user, password) => {
  console.log(user);
  console.log(password);
  setUserId(user);
   if (true) {
        setIsValidate(true);
   } else {
       setIsValidate(false);
   }
}

const invalidateUser = (userId) => {
  setUserId('');
  setIsValidate(false);
  };

const refreshHomePage = (userId) =>{
    alert('ayam want to refresh homepage now for user' + userId);
    setUserId(userId);
    setIsValidate(true);
}

  return (
      <Layout userName={userId} isValid={isValidate} logOut={invalidateUser}>
      { isValidate ?  
        <div> 
             <Homepage user={userId} refreshHomePage={refreshHomePage}/>

        </div>
      :   
      <div> 
      <Switch>
      <Route  path='/' exact> 
        <Redirect to='/welcome'/> 
      </Route>
      <Route path='/welcome' exact>  
      <Welcome isValid={false} username={null}/>
      </Route>
      <Route path='/register'> 
      <SignUp onRegister={addUserHandler}/>
      </Route>
      <Route path='/login' exact>  
      <LogIn onLogIn={logInHandler}/>
      </Route>
      </Switch>
      </div>  }
      </Layout>
  );
}

export default App;
