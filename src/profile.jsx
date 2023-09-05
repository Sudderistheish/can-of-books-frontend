import React from 'react';
import {UseAuthO} from '@authO/authO-react';
import { render } from 'react-dom';

class Profile extends React.Component {
    render() {
        const  {user} = UseAuthO(); {   



         }
   
return (
    <div>
        <h2>Profile</h2>
        <img src={user.picture} alt={user.name} />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
    </div>

);

}

}



render (<Profile />, document.getElementById ('root'));
