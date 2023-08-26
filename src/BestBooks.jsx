import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Button, CarouselItem, Form, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";

let server = import.meta.env.VITE_APP_URL || "http://127.0.0.1:3001";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formTitle: "",
      description: "",
    };
  }
  componentDidMount() {
    this.fetchBooks();
  }
  handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/books/${id}`);
      const remaingBooks = this.state.books.filter((book) => book._id !== id);
      this.setState({
        books: remaingBooks,
      });
    } catch (error) {
      console.error(error);
    }
  };
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

  handleSubmit = async (event) => {
     let apiURL = `${server}/books`;
    event.preventDefault()
    try { 
     const newBook = await axios.post(apiURL,{
      name: this.state.formTitle, 
      description: this.state.description,
     } );
     this.setState ({books:[...this.state.books, newBook.data]})
    } catch (error) {
      console.error(error)
    }
  }
  //* TODO: render all the books in a Carousel */

  render() {
   
    //const {(books)} =this.state;
    return (
      <>
        <nav>
          <h1>Can of Books</h1>
        </nav>
        <Carousel>
          {this.state.books?.map((book) => {
            return (
              <Carousel.Item key={book._id}>
                <div className="bookRapper">
                  <Image
                    src="https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    alt=""
                    fluid
                  />
                  <h3>{book.name}</h3>
                  <p>{book.author}</p>
                  <p>{book.year}</p>
                  <div onClick={() => this.handleDelete(book._id)}>
                    <Icon icon="icon-park:delete" />
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

          {this.state.books.length ? (
            <p>Book Carousel coming soon</p>
          ) : (
            <h3>No Books Found :</h3>
          )}
          <Form onSubmit={this.handleSubmit} >
            <Form.Group
              onChange={(event) => {
                this.setState({ formTitle: event.target.value });
              }}
              className="mb-3"
              controlId="title"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
              <Form.Text className="text-muted">
                Empowering Books For The Mind
              </Form.Text>
            </Form.Group>
            <Form.Group
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
              className="mb-3"
              controlId="description"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Description" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default BestBooks;
