import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
// import styled from 'styled-components';
import MovieCard from '../../components/MovieCard';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string'

 
class Home extends Component {
  state = {
    movies: null,
    genre: 'Popular',
    genreId : null,
  }

  componentDidUpdate(prevProps, prevState) {
     const parsedSearch = queryString.parse(this.props.location.search);
     if ((Object.keys(parsedSearch).length === 0) && (this.props.match.params.genre !== this.state.genre)){
       this.setState({genre: this.props.match.params.genre},
        () => this.fetchMovies())
    } else if (parsedSearch.id !== prevState.genreId) {
     this.setState({genreId: parsedSearch.id}, ()=> this.fetchMovies(parsedSearch.id)) 
    } else {
      return;
    }
  }
  

  componentDidMount() {     
     this.fetchMovies();            
  }

  

  fetchMovies = (id = null) => {
    const {genre} = this.state;
    if (!id) {
      axios
      .get(
        `https://api.themoviedb.org/3/movie/${genre.toLowerCase()}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&page=1`
        )
        .then(res => this.setState({movies: res.data.results}, ()=> console.log('!!!')))
        .catch(err => console.log(err)); 
    } else {
       axios
      .get(
`https://api.themoviedb.org/3/discover/movie?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&sort_by=popularity.desc&with_genres=${id}&include_video=false&page=1`)
        .then(res => this.setState({movies: res.data.results}, ()=> console.log('!!!')))
        .catch(err => console.log(err)); 
    }
  }

  render() {
    const {movies} = this.state;
     let list;
     if (movies){
      list = movies.map(movie => (
        <MovieCard
          imageURL={movie.poster_path}
          title={movie.original_title}
          id={movie.id}
        />
      ))
    } else {
      list = <p>Loading</p>
    }
    return (
      <div className="row"> 
        {list}
      </div> 
    )
  }
}

// Home.propTypes = {};

export default withRouter(Home);
