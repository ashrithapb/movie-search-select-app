import React from "react";

function MovieLists(props) {
  const MyMovieList = props.myMovieList;

  const isAdded = (movieId) => {
    let alreadyAdded = false;
    props.myList?.map((mylistMovie) => {
      if (mylistMovie.imdbID === movieId) {
        alreadyAdded = true;
        return mylistMovie;
      } else return mylistMovie;
    });
    if (alreadyAdded === false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {props.movies.length !== 0 ? (
        props.movies?.map((movie) => (
          <div
            className="movieList-container d-flex justify-content-start m-3"
            key={movie.imdbID}
          >
            <img
              className="movie-list-img"
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Movies_Coverart.jpg/220px-The_Movies_Coverart.jpg"
              }
              alt={movie.Title}
            />

            <div
              className="overlay d-flex align-items-center justify-content-center m-3"
              onClick={() => {
                props.handleMyListClick(movie, isAdded(movie.imdbID));
              }}
            >
              {!props.isMylist ? (
                <MyMovieList isAdded={isAdded(movie.imdbID)} />
              ) : (
                <MyMovieList />
              )}
            </div>
          </div>
        ))
      ) : props.isMylist ? (
        <p className="movie-list-hint">My movie list is Empty</p>
      ) : (
        <p className="movie-list-hint">
          Search for the movie list (example: Avatar)
        </p>
      )}
    </>
  );
}

export default MovieLists;
