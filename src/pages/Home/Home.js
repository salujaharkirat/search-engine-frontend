import React from "react";

import "./Home.css";

import Results from "./components/Results";
import Books from "./components/Books";

const Home = ({
  buttonDisabled,
  results,
  searchText,
  onChange,
  onSubmit,
  books,
  onBookSelect
}) => {
  return (
    <div className="home-container">
      <h1>Search Books</h1>
      <form className="home-form" onSubmit={onSubmit}>
        <div className="form-left">
          <label>
            <input
              type="text"
              name="name"
              value={searchText}
              onChange={onChange}
              className="search-bar"
            />
            {
              results.length > 0 ? <Results results={results} onBookSelect={onBookSelect} /> : null
            }
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" disabled={buttonDisabled} />
        </div>
      </form>
      {
        books.length > 0 ? (
        <div className="books">
           <Books books={books} />
        </div>
        ) : null
      }
    </div>
  )
}


export default Home;