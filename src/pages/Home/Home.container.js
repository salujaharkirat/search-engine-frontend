import React from "react";
import axios from "axios";

import Home from "./Home";

const API_END_POINT = "http://localhost:8000/api/v0/books/";

class HomeContainer extends React.Component {
  state = {
    results: [],
    searchText: "",
    selectedBook: {},
    books: []
  }

  onChange = (event) => {
    this.setState({searchText: event.target.value});
  }

  onBookSelect = (book) => {
    this.setState({
      searchText: book.title,
      results: [],
      selectedBook: book
    });

  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      books: [...this.state.books, {...this.state.selectedBook}],
      selectedBook: {},
      searchText: ""
    })
  }

  fetchData = () => {
    this.setState({loading: true});
    const payload = {
      queries: [this.state.searchText],
      k: 3
    };
    axios.post(API_END_POINT, payload)
      .then(({data}) => {
        const {books} = data;
        let results = [];
        if (books && books.length) {
          results = [...books[0]]
        }
        this.setState({results: results});
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.setState({loading: false});
      })
  }

  handleChange = () => {
    let timer;
    return (event) => {
      clearTimeout(timer);
      this.onChange(event);
      if (event.target.value.length >= 3) {
        timer = setTimeout(this.fetchData, 1000);
      }
    };
  }

  render () {
    const {
      searchText,
      results,
      books,
      selectedBook
    } = this.state;

    const buttonDisabled = Object.keys(selectedBook).length > 0 ? false : true;
    return (
      <Home
        buttonDisabled={buttonDisabled}
        results={results}
        books={books}
        searchText={searchText}
        onBookSelect={this.onBookSelect}
        onChange={(event) => this.handleChange()(event)}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default HomeContainer;