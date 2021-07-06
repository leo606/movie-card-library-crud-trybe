import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shouldRedirect: false,
      movie: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.fetchMovie(id);
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({ shouldRedirect: true });
  }

  async fetchMovie(id) {
    try {
      const request = await movieAPI.getMovie(id);
      this.setState({ loading: false, movie: request });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default EditMovie;
