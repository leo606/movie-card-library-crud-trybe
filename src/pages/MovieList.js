import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      movies: [],
    };
    this.fetchMoviesList = this.fetchMoviesList.bind(this);
  }

  componentDidMount() {
    this.fetchMoviesList();
  }

  async fetchMoviesList() {
    try {
      const response = await movieAPI.getMovies();
      this.setState({ loading: false, movies: response });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { movies, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="movie-list">
        <div>
          {movies.map((movie) => (
            <MovieCard key={ movie.title } movie={ movie } />
          ))}
        </div>
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
