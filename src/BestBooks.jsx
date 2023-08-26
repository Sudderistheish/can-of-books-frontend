import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Button, Modal, CarouselItem, Form, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";

let server = import.meta.env.VITE_APP_URL || "http://127.0.0.1:3001";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formTitle: "",
      description: "",
      show: false,
      updateTitle: "",
      updateDescription: "",
      selectedBook: "",
      updateYear: 9999,
      updateAuthor: "",
      updateStatus: true,
    };
  }
  componentDidMount() {
    this.fetchBooks();
  }

  handleClose = () =>
    this.setState({
      show: false,
      selectedBook: "",
    });

  handleOpen = (id) => this.setState({ show: true, selectedBook: id });

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
    event.preventDefault();
    try {
      const newBook = await axios.post(apiURL, {
        name: this.state.formTitle,
        description: this.state.description,
      });
      this.setState({ books: [...this.state.books, newBook.data] });
    } catch (error) {
      console.error(error);
    }
  };
  //* TODO: render all the books in a Carousel */

  handleUpdate = async (event) => {
    let apiURL = `${server}/books/${this.state.selectedBook}`;
    event.preventDefault();
    try {
      const newBook = await axios.put(apiURL, {
        name: this.state.updateTitle,
        description: this.state.updateDescription,
        author: this.state.updateAuthor,
        status: this.state.updateStatus,
        year: this.state.updateYear,
      });

      this.setState({
        books: [...this.state.books, newBook.data],
        updateTitle: "",
        updateDescription: "",
        updateAuthor: "",
        updateStatus: true,
        updateYear: 9999,
      });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    console.log(this.state.updateStatus); //const {(books)} =this.state;
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
                  <div className="wrapper">
                    <div onClick={() => this.handleDelete(book._id)}>
                      <Icon icon="icon-park:delete" />
                    </div>
                    <div onClick={() => this.handleOpen(book._id)}>
                      <Icon icon="icon-park:edit" />
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div>
          <h2> Add Book to Carousel</h2>

          <Form onSubmit={this.handleSubmit}>
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
            <Form.Group
              onChange={(event) => {
                this.setState({ updateYear: +event.target.value });
              }}
              className="mb-3"
              controlId="Year"
            >
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" placeholder="1985" />
            </Form.Group>
            <Form.Group
              onChange={(event) => {
                this.setState({ updateAuthor: event.target.value });
              }}
              className="mb-3"
              controlId="Author"
            >
              <Form.Label>Author</Form.Label>
              <Form.Control type="name" placeholder="Robert M." />
            </Form.Group>
            <Form.Group
              onChange={(event) => {
                this.setState({
                  updateStatus: !this.state.updateStatus,
                });
              }}
              className="mb-3"
              controlId="formBasicCheckbox"
              Check={this.state.updateStatus}
            >
              <Form.Check type="checkbox" label="In Stock" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleUpdate}>
              <Form.Group
                onChange={(event) => {
                  this.setState({ updateDescription: event.target.value });
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
                  this.setState({ updateTitle: event.target.value });
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BestBooks;
//  UpdateItems = async (id) => {
// await axios.update("${server}/items/${id}");
//const remaingItems = this.state.items.filter((item) => item._id !== id);
//this.setState({
//items: remaingItems,
