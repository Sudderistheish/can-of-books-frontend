import Header from "./Header.jsx";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { Component } from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './profile.jsx';


//const Server = import.meta.env.VITE_SERVER_URL;
const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId= import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
const redirectUri= window.location.origin;

class App extends Component {
  
   
  render() {
    return (
      <>
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
        redirect_uri: redirectUri
      }}>
<Profile/>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestBooks />}></Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </Auth0Provider>
      </>
    );
  }
}

export default App

//  UpdateItems = async (id) => {
   // await axios.update("${server}/items/${id}");
    //const remaingItems = this.state.items.filter((item) => item._id !== id);
    //this.setState({
      //items: remaingItems,