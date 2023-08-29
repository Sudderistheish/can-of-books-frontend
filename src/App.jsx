import Header from "./Header.jsx";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { Component } from "react";
//const Server = import.meta.env.VITE_SERVER_URL;

class App extends Component {
  
   
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestBooks />}></Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
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