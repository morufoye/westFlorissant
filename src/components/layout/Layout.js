import classes from './Layout.module.css';
import { Fragment } from 'react';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  //console.log('ayam in Layout.js'  + props.userName + ' also ' + props.isValid);
    return <Fragment>
            <MainNavigation userId={props.userName} isValidate={props.isValid} logOut={props.logOut} />
             <main className={classes.main}> {props.children}</main>
           </Fragment>
};

export default Layout;

