import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
let server = import.meta.env.VITE_APP_URL || "http://127.0.0.1:3001";
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  componentDidMount() {
    this.fetchBooks();
  }
  async fetchBooks(location = null) {
    let apiURL = `${server}/books`;

    if (location) {
      apiURL += `?location${location}`;
    }

    try {
      const response = await axios.get(apiURL);
      this.setState({
        books:
          response.data /* TODO: Make a GET request to your API to fetch all the books from the database  */,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleLocationSubmit = (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    console.log({ location });
    this.fetchBooks(location);
  };

  // Process the data (list of books) here

  render() {
    //* TODO: render all the books in a Carousel */

    return (
      
          <>
        <nav>
          <h1>Can of Books</h1>
        </nav>
       
          
              <div>
                <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

                {this.state.books.length ? (
                  <p>Book Carousel coming soon</p>
                ) : (
                  <h3>No Books Found :</h3>
                )}
              </div>
         
         </>
        
    );
  }
}

export default BestBooks;
