import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import Spinner from '../../UI/Spinner';
import ImgLoader from '../Info/Img';
import Pagination from './Pagination';
import Error from '../../Error';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const Role = styled.p`
  text-align: center;
  margin-top: 0;
  font-size: 0.9rem;
`

const Name = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 5px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2``

class Actors extends Component {
  state = {
    actors: [],
    loading: true,
    currentPage: 1,
    totalPage: null,
    error: null     
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=8c7720742602f6274d23061fa907cb34`)
         .then(res => {
          const totalPage = Math.ceil(res.data.cast.length / 8);
          this.setState({actors: res.data.cast, loading: false, totalPage, error: null})
          })
         .catch(err => this.setState({error: err.response.data.status_message, loading: false}))
  }

  changePage = (type) => {
    const { currentPage, totalPage } = this.state;
    if (type === 'next' && currentPage < totalPage){
      this.setState((prevState) => ({currentPage: prevState.currentPage + 1}))
    } else if (type === 'prev' && currentPage > 1) {
      this.setState((prevState) => ({currentPage: prevState.currentPage - 1}))
    } else {
      return null;
    }    
  }

  render() {
    const {actors, loading, currentPage, totalPage, error} = this.state;
     const { changePage } = this; 
    let list = [];
    if (loading){
      list = (
      <div className="col-lg-12">
        <Spinner/>
      </div>
      )        
    } else if (error) { 
      list = <Error center>{error}</Error>       
    } else {
      const begin = currentPage * 8 - 8;
      const end = currentPage * 8;
      const sliceArr = actors.slice(begin, end);  
      list = sliceArr.map(actor => (
        <div className="col-xs-offset-3 col-xs-6 col-sm-offset-0 col-sm-6 col-md-3 col-lg-3">
        <Wrapper>
          <ImgLoader imageURL={actor.profile_path} actors infoCard/>
          <Name>
            {actor.name}
          </Name>
          <Role>
            {actor.character}
          </Role>
        </Wrapper>
        </div>
      )
        ) 

    }
    return( 
        <>
          {list.length >= 1 ? 
          <>
            <div className="col-lg-12">
            <Element name="actors" className="actors">
              <Title>Actors</Title>
            </Element>
            </div>
            {list}
            <div className="col-lg-12">
              <Pagination totalPage={totalPage} currentPage={currentPage} changePage={changePage}/>
            </div>
          </> : null
          }
        </>
    )
  }
}

export default withRouter(Actors);
