import React from 'react';
import Card from '../components/UI/Card';
import './Homepage.css';

const Homepage = (props) => {
//console.log('ayam now inside homepage.js and ' + props.user );
 return (
 <Card>
     <p className="Homepage-display-text"> Welcome {props.user} to West Florissant Masjid web portal </p>
 </Card>  


 );
};

export default Homepage;