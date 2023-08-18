import React from "react";
import axios from "axios";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  componentDidMount () {
    this.fetchBooks();
  }
  async fetchBooks (location = null) {
    let apiURL = `${server}/books`;

    if (location) { apiURL+= `?location${location}`

  }
    
  try {
        const response = await axios.get("YOUR_API_ENDPOINT");
        this.setState({
          books: response.data,/* TODO: Make a GET request to your API to fetch all the books from the database  */
        }); 
        console.log(error); 
    }
      

}    

    
    // Process the data (list of books) here
   

  render() {
    const { books } = this.state;/* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks
