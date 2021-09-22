import React from 'react';
import classes from './MainNavigation.module.css'
import { NavLink } from 'react-router-dom';
import Button from '../../pages/Button';


 const MainNavigation = (props) => {
    
  let auth = props.isValidate;

  const invalidateUser = (userId) => {
      props.logOut(userId)
  }
  //console.log('now mo wa ninu MainNavidgator.js ' + props.userId + ' also ' + props.isValidate);
 
    return (
            <div>
            <header  className={classes.header}>
              <div className={classes.logo}> West Florissant Masjid Web Portal </div>
                 {auth ? 
                  <div>
                    <nav className={classes.nav}> 
                    <ul> 
                 <p>
                       Welcome {props.userId} 
                 </p>  
                 <Button onClick={invalidateUser}>
                      log out
                 </Button>
                 </ul> 
              </nav>
                 </div> : 

                    <div>
                    <nav className={classes.nav}> 
                    <ul> 
                    <li>
                      <NavLink to='/register' activeClassName={classes.active}> 
                        Register 
                      </NavLink>
                 </li>  
                 <li>
                      <NavLink to='/login' activeClassName={classes.active}> 
                       Log In
                      </NavLink>
                 </li>  
                 </ul> 
                 </nav>
                    </div>
                 }
           </header>
           </div>
           );

 };


 export default MainNavigation;