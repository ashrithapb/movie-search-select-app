import React from "react";

function MovieSearch({ input, setInput }) {
  return (
    <div className="col col-sm-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default MovieSearch;
