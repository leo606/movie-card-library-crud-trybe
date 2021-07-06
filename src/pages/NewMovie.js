import React, { Component } from 'react';
import { Redirect } from 'react-router';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: '',
        subtitle: '',
        storyline: '',
        rating: 0,
        imagePath: '',
        bookmarked: false,
        genre: '',
      },
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(newMovie) {
    await movieAPI.createMovie(newMovie);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { movie, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div data-testid="new-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}
export default NewMovie;
