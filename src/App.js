import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import MoviesListHeading from './components/MoviesListHeading';
import SearchBar from './components/SearchBar';
import AddFavourites from './components/AddFavourites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {
  const localStorageKey = "react-movie-app-fav";
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=957a9f4e&s=${searchValue}`
    const response = await fetch(url)
    const responseJson = await response.json()
    console.log(responseJson)
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  const saveLocalStorage = (items) => {
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

  const addFavMovie = (movie) => {
    const newFavList = [...favorites, movie];
    setFavorites(newFavList);
    saveLocalStorage(newFavList);
  }

  const removeFavMovie = (movie) => {
    const newFavList = favorites.filter(m => m.imdbID !== movie.imdbID);
    setFavorites(newFavList);
    saveLocalStorage(newFavList);
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
      const items = JSON.parse(localStorage.getItem(localStorageKey))
      if (items) {
        setFavorites(items)
      }
  }, [])

  return (
    <div className="container-fluid movie-app">

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MoviesListHeading heading="Movies" />
        <SearchBar value={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='row'>
        <MoviesList
          movies={movies}
          handleFavClick={addFavMovie}
          favComponent={AddFavourites}
        />
      </div>

      <div className='row d-flex aligh-items-center mt-4 mb-4'>
        <MoviesListHeading heading="Favorites" />
      </div>

      <div className='row'>
        <MoviesList
          movies={favorites}
          handleFavClick={removeFavMovie}
          favComponent={RemoveFavorites}
        />
      </div>

    </div>
  );
}

export default App;
