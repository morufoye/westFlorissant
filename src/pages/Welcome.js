import React from 'react';
import Card from '../components/UI/Card';

const Welcome = (props) => {
  console.log();
    return (
     <Card>
    {props.isvalid ? 
    <p> {props.username} , you are welcome to West Florissant Masjid web portal </p>
     :
        <div>
     <p style={{fontSize: "20"}}>West Florissant Masjid</p>
       <p style={{fontSize: "10"}}>St Louis</p>
       <p style={{fontSize: "10"}}>6809 West Florissant Avenue, St. Louis, MO</p>
        </div>
    }
    </Card>
  );
}

export default Welcome;