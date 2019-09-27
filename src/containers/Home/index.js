import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
// import styled from 'styled-components';
import MovieCard from '../../components/MovieCard';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string'
import Pagination from '../../components/UI/Pagination';
import { animateScroll as scroll } from "react-scroll";

 
class Home extends Component {
  state = {
    movies: null,
    genre: 'Popular',
    genreId : null,
    currentPage: 1
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('CDU MATCh', this.props)
    const parsedSearch = queryString.parse(this.props.location.search);
    console.log(parsedSearch.id === 'null')
    if ( (parsedSearch.id === 'null') && ((this.props.match.params.genre !== this.state.genre)||(this.state.currentPage !== parsedSearch.page))){
       this.setState({genre: this.props.match.params.genre, currentPage: parsedSearch.page},
        () => this.fetchMovies())} 
    if (!(parsedSearch.id === 'null') && ((this.props.match.params.genre !== this.state.genre)||(this.state.currentPage !== parsedSearch.page))){
      this.setState({genre: this.props.match.params.genre, currentPage: parsedSearch.page}, ()=> this.fetchMovies(parsedSearch.id)) 
    }
  }  

  componentDidMount() {     
     this.fetchMovies();            
  }  

  fetchMovies = (id = null) => {
    const {genre, currentPage} = this.state;
    scroll.scrollToTop(); 
    if (!id) {
      axios
      .get(
        `https://api.themoviedb.org/3/movie/${genre.toLowerCase()}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&page=${currentPage}`
        )
        .then(res => this.setState({movies: res.data.results}, ()=> console.log('!!!')))
        .catch(err => console.log(err)); 
    } else {
       axios
      .get(
`https://api.themoviedb.org/3/discover/movie?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&sort_by=popularity.desc&with_genres=${id}&include_video=false&page=${currentPage}`)
        .then(res => this.setState({movies: res.data.results}, ()=> console.log('!!!')))
        .catch(err => console.log(err)); 
    }
  }

  render() {
    const {movies, currentPage} = this.state;
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
      <Pagination currentPage={currentPage}/>
      </div> 
    )
  }
}

// Home.propTypes = {};

export default withRouter(Home);
