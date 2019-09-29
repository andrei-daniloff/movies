import React, { Component, lazy, Suspense } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { animateScroll as scroll } from "react-scroll";
import Spinner from '../../components/UI/Spinner';
import Error from '../../components/Error';

const MovieCard = lazy(() => import('../../components/MovieCard'));
const Pagination = lazy(() => import('../../components/UI/Pagination'));
const API = 'https://api.themoviedb.org/3';
const KEY = 'api_key=8c7720742602f6274d23061fa907cb34'; 
 
const Title = styled.h1`
  margin-top: 0px;
  line-height: 2rem;
  @media (max-width: 575px){
    text-align: center
  }
`

class Home extends Component {
  state = {
    movies: [],
    genre: 'Popular',
    genreId : null,
    currentPage: 1,
    loading: true,
    totalPages: null,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    const { genre, currentPage, searchPage } = this.state;
    const parsedSearch = queryString.parse(this.props.location.search);
    const prevParsedSearch = queryString.parse(prevProps.location.search);
    const { params, path } = this.props.match;
    const search = /search/.test(path);
    const page = parseInt(parsedSearch.page);
    if (((genre !== params.genre || parsedSearch.page !== currentPage) && !parsedSearch.id) && !search ){
      this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page},
      () => this.fetchMovies())
    } 
    
    if (((genre !== params.genre || parsedSearch.page !== currentPage) && parsedSearch.id) && !search ){
      this.setState({loading: true, genre: this.props.match.params.genre, currentPage: parsedSearch.page},
      () => this.fetchMovies(parsedSearch.id))
    } 

    if ((search && (genre !== params.request)) || (search && (prevParsedSearch.page !== parsedSearch.page))){
      this.setState({loading: true, genre: this.props.match.params.request, currentPage: parsedSearch.page},
      () => this.fetchMovies())
    }
  }  

  componentDidMount() {     
     this.fetchMovies();            
  }  

  fetchMovies = (id = null) => {
    const { genre, currentPage, loading ,searchPage } = this.state;
    const { request } = this.props.match.params;
    const { params, path } = this.props.match;
    const search = /search/.test(path);
    const parsedSearch = queryString.parse(this.props.location.search);
    const genreLower = genre.toLowerCase();
    scroll.scrollToTop(); 
    if (!parsedSearch.id && !search) {
       axios.get(
        `${API}/movie/${genreLower}?${KEY}&language=en-US&page=${currentPage}`
        )
        .then(res => this.setState({error: null, loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => this.setState({loading: false, error: err.response.data.status_message})); 
    } else if (parsedSearch.id && !search) {
        axios.get(
        `${API}/discover/movie?${KEY}&language=en-US&sort_by=popularity.desc&with_genres=${parsedSearch.id}&include_video=false&page=${currentPage}`
        )
        .then(res => this.setState({error: null, loading: false, movies: res.data.results, totalPages: res.data.total_pages}))
        .catch(err => this.setState({loading: false, error: err.response.data.status_message})); 
    } else if ( search ) {
       axios.get(
        `${API}/search/movie?${KEY}&language=en-US&query=${params.request}&page=${parsedSearch.page}`
        )
        .then(res => {
          if (res.data.results.length === 0){
             this.setState({error: "The movie not found", loading: false})
          } else {
            this.setState({error: null, loading: false, movies: res.data.results, totalPages: res.data.total_pages})
          }
        })
        .catch(err => this.setState({loading: false, error: err.response.data.status_message})); 
    }
  }

  render() {
    const { movies, currentPage, loading, totalPages, genre, error } = this.state;
    let list;
    if (loading){
      list = <Spinner/>
    } else if (error) {
      list = <Error center>{error}</Error>
    } else {
       const title = genre.split('_').join(' ');
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

export default withRouter(Home);
