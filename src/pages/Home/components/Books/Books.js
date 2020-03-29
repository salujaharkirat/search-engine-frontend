import React from "react";

import "./Books.css";

const COLOR_MAP = ["#90caf9", "#e7b9ff", "#9fffe0", "#ffffbf", "#ffffe4"]

const Books = ({books}) => (
  <>
    {books.map((book, index) => (
      <div
        className="book"
        style={{
          backgroundColor: COLOR_MAP[index % 4]
        }}
      >
        <p className="book-title">{book.title}</p>
        <p className="book-author">-{book.author}</p>
        <p className="book-summary">{book.summary}</p>
      </div>
    ))}
  </>
);

export default Books;
