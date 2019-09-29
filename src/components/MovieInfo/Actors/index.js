import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import Spinner from '../../UI/Spinner';
import ImgLoader from '../Info/Img';
import Pagination from './Pagination';

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
    totalPage: null     
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=8c7720742602f6274d23061fa907cb34`)
         .then(res => {
          const totalPage = Math.ceil(res.data.cast.length / 8);
          console.log(totalPage,'total')
          this.setState({actors: res.data.cast, loading: false, totalPage})
          })
         .catch(err => console.log(err))
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
    const {actors, loading, currentPage, totalPage} = this.state;
    console.log(currentPage,"CUr")
    const { changePage } = this; 
    let list;
    if (loading){
      list = <Spinner/>
    } else {
      const begin = currentPage * 8 - 8;
      const end = currentPage * 8;
      const sliceArr = actors.slice(begin, end);  
      list = sliceArr.map(actor => (
        <div className="col-lg-3">
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
          <div className="col-lg-12">
            <Title>Actors</Title>
          </div>
          {list}
          <div className="col-lg-12">
            <Pagination totalPage={totalPage} currentPage={currentPage} changePage={changePage}/>
          </div>
        </>
    )
  }
}

export default withRouter(Actors);
