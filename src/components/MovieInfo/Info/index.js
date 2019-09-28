import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ImgLoader from './Img';
import Details from './Details';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`


class Info extends Component {
  state = {
    title: null,
    genres: [],
    overview: null,
    poster: null,
    duration: null,
    release_date: null,
    rate: null
   }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US`
      )
      .then(({data}) => this.setState({
        title: data.title,
        genres: data.genres,
        overview: data.overview,
        poster: data.poster_path,
        duration: data.runtime,
        release_date: data.release_date,
        rate: data.vote_average
      }))
      .catch(err => console.log(err));
  }

  render() {
    const { poster } = this.state;    
    return (
      <>
        <div className="col-lg-4">
        <Wrapper>
          <ImgLoader imageURL={poster} infoCard/>
        </Wrapper>
        </div>
        <div className="col-lg-8">
          <Details {...this.state}/>
        </div>
      </>
    );
  }
}

export default withRouter(Info);
