import React from 'react';
import Card from '../components/UI/Card';

const Welcome = (props) => {
  console.log();
    return (
     <Card>
    {props.isvalid ? 
    <p> {props.username} , you are welcome to West Florissant Masjid web portal </p>
     :
     <p>Welcome to West Florissant Masjid Web Portal. </p>
    }
    </Card>
  );
}

export default Welcome;