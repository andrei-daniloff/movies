import React, { Component, lazy, Suspense } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
// import styled from 'styled-components';
// import MovieCard from '../../components/MovieCard';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string'
// import Pagination from '../../components/UI/Pagination';
import styled from 'styled-components';
import { animateScroll as scroll } from "react-scroll";
import Spinner from '../../components/UI/Spinner';

const MovieCard = lazy(()=> import('../../components/MovieCard'));

const Pagination = lazy(()=> import('../../components/UI/Pagination'));
 
const Title = styled.h1`
  margin-top: 0px;
  line-height: 2rem;
`

class Home extends Component {
  state = {
    movies: [],
    genre: 'Popular',
    genreId : null,
    currentPage: 1,
    loading: false,
    totalPages: null
  }

  componentDidUpdate(prevProps, prevState) {
    const parsedSearch = queryString.parse(this.props.location.search);
    if ( (parsedSearch.id === 'null') && ((this.props.match.params.genre !== this.state.genre)||(this.state.currentPage !== parsedSearch.page))){
       this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page},
        () => this.fetchMovies())} 
    if (!(parsedSearch.id === 'null') && ((this.props.match.params.genre !== this.state.genre)||(this.state.currentPage !== parsedSearch.page))){
      this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page}, ()=> this.fetchMovies(parsedSearch.id)) 
    }
  }  

  componentDidMount() {     
     this.fetchMovies();            
  }  

  fetchMovies = (id = null) => {
    const {genre, currentPage,loading} = this.state;
    scroll.scrollToTop(); 
    if (!id) {
      axios
      .get(
        `https://api.themoviedb.org/3/movie/${genre.toLowerCase()}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&page=${currentPage}`
        )
        .then(res => this.setState({loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => console.log(err)); 
    } else {
       axios
      .get(
`https://api.themoviedb.org/3/discover/movie?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&sort_by=popularity.desc&with_genres=${id}&include_video=false&page=${currentPage}`)
        .then(res => this.setState({loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => console.log(err)); 
    }
  }

  render() {
    const {movies, currentPage,loading, totalPages, genre } = this.state;
    let list;
    const title = genre.split('_').join(' ')
    if (loading){
      list = <Spinner/>
    } else {
      list =        
        <Suspense fallback={<Spinner />}>
        <div className="col-lg-12">
          <Title>{title}</Title>
        </div>
          {movies.map(movie => (
          <MovieCard
            imageURL={movie.poster_path}
            title={movie.original_title}
            id={movie.id}
          />
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages}/>
        </Suspense>      
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
