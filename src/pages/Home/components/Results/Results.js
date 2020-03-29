import React from "react";

import "./Results.css";

const Results = ({
  results,
  onBookSelect
}) => (
  <div className="results">
  {
    results.map((result, index) => (
      <p
        key={result.id}
        className="result"
        onClick={() => onBookSelect(result)}
        style={{
          borderBottomWidth:  results.length - 1 === index ? "0px" : null
        }}
      >
        {result.title}
      </p>
    ))
  }
</div>
);

export default Results;
