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
    loading: true,
    totalPages: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { genre, currentPage, searchPage } = this.state;
    const parsedSearch = queryString.parse(this.props.location.search);
    const prevParsedSearch = queryString.parse(prevProps.location.search);
    const { params, path } = this.props.match;
    const search = /search/.test(path);
    const page = parseInt(parsedSearch.page);
    console.log(prevProps,"prevProps", this.props, 'this props', parsedSearch, 'parsed')
        console.log(this.state,"state" )

    if (((genre !== params.genre || parsedSearch.page !== currentPage) && !parsedSearch.id) && !search ){
      this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page},
      () => this.fetchMovies())
    } 
    
    if (((genre !== params.genre || parsedSearch.page !== currentPage) && parsedSearch.id) && !search ){
      this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page},
      () => this.fetchMovies(parsedSearch.id))
    } 

    if ((search && (genre !== params.request)) || (search && (prevParsedSearch.page !== parsedSearch.page))){
      this.fetchMovies()
    }

  }  

  componentDidMount() {     
     this.fetchMovies();            
  }  

  fetchMovies = (id = null,) => {
    const { genre, currentPage, loading ,searchPage } = this.state;
    const { request } = this.props.match.params;
    const { params, path } = this.props.match;
    const search = /search/.test(path);
    const parsedSearch = queryString.parse(this.props.location.search);
    scroll.scrollToTop(); 
    if (!parsedSearch.id && !search) {
      console.log("1")
      axios
      .get(
        `https://api.themoviedb.org/3/movie/${genre.toLowerCase()}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&page=${currentPage}`
        )
        .then(res => this.setState({loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => console.log(err)); 
    } else if (parsedSearch.id && !search) {
      console.log("2")
       axios
      .get(
`https://api.themoviedb.org/3/discover/movie?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&sort_by=popularity.desc&with_genres=${parsedSearch.id}&include_video=false&page=${currentPage}`)
        .then(res => this.setState({loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => console.log(err)); 
    } else if ( search ) {
       axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=8c7720742602f6274d23061fa907cb34&language=en-US&query=${params.request}&page=${parsedSearch.page}`)
        .then(res => this.setState({currentPage: parsedSearch.page, genre: params.request, loading: false, movies: res.data.results, totalPages: res.data.total_pages}, ()=>console.log(this.state)))
        .catch(err => console.log(err)); 
    }
  }

  render() {
    const {movies, currentPage, loading, totalPages, genre } = this.state;
    let list;
    if (loading){
      list = <Spinner/>
    } else {
      const title = genre.split('_').join(' ')
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
