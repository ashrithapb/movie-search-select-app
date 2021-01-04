import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MovieLists from "./components/MovieLists";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieListHeading from "./components/MovieListHeading";
import MovieSearch from "./components/MovieSearch";
import AddToMyMovieList from "./components/AddToMyMovieList";
import RemoveSelectedMovie from "./components/RemoveSelectedMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [myList, setMyList] = useState([]);
  const getMovie = useRef(() => {});
  getMovie.current = async () => {
    const url = `https://www.omdbapi.com/?s=${input}&apikey=40b5ba52`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    const selectedMovies = JSON.parse(localStorage.getItem("my-movie-list"));
    selectedMovies && setMyList(selectedMovies);
  }, []);

  useEffect(() => {
    getMovie.current(input);
  }, [input]);

  const addToMyList = (movie, isAdded) => {
    let isAlreadyAdded = myList.includes(movie);
    if (!isAlreadyAdded && !isAdded) {
      const updatedSelectedMovies = [...myList, movie];
      updatedSelectedMovies && setMyList(updatedSelectedMovies);
      saveToLocalStorage(updatedSelectedMovies);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("my-movie-list", JSON.stringify(items));
  };

  const removeFromMyList = (movie) => {
    const updatedSelectedMovies = myList.filter(
      (selectedMovie) => selectedMovie.imdbID !== movie.imdbID
    );
    updatedSelectedMovies && setMyList(updatedSelectedMovies);
    saveToLocalStorage(updatedSelectedMovies);
  };

  return (
    <div className="container-fluid app">
      <h1>Movie Search-Select application</h1>
      <div className="row d-flex mt-4 mb-4 align-items-center">
        <MovieListHeading title="Movies" />
        <MovieSearch input={input} setInput={setInput} />
      </div>

      <div className="row">
        <MovieLists
          movies={movies}
          myMovieList={AddToMyMovieList}
          handleMyListClick={addToMyList}
          isMylist={false}
          myList={myList}
        />
      </div>

      <div className="row d-flex mt-4 mb-4 align-items-center">
        <MovieListHeading title="My Movie List" />
      </div>
      <div className="row">
        <MovieLists
          movies={myList}
          myMovieList={RemoveSelectedMovie}
          handleMyListClick={removeFromMyList}
          isMylist={true}
        />
      </div>
    </div>
  );
}

export default App;
