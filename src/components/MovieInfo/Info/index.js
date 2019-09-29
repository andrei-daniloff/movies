import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ImgLoader from './Img';
import Details from './Details';
import styled from 'styled-components';
import Spinner from '../../UI/Spinner';
import Error from '../../Error';

const Wrapper = styled.div`
  display: flex;
`;

class Info extends Component {
  state = {
    title: null,
    genres: [],
    overview: null,
    poster: null,
    duration: null,
    release_date: null,
    rate: null,
    error: null,
    loading: true
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=8c7720742602f6274d23061fa907cb34&language=en-US`
      )
      .then(({ data }) =>
        this.setState({
          title: data.title,
          genres: data.genres,
          overview: data.overview,
          poster: data.poster_path,
          duration: data.runtime,
          release_date: data.release_date,
          rate: data.vote_average,
          error: null,
          loading: false
        })
      )
      .catch(err => this.setState({ error: err.response.data.status_message, loading: false }));
  }

  render() {
    const { poster, loading, error } = this.state;
    let info;
    if (loading) {
      info = <Spinner />;
    } else if (error) {
      info = <Error center>{error}</Error>;
    } else {
      info = (
        <>
          <div className="col-xs-offset-3 col-xs-6 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-0 col-lg-4">
            <Wrapper>
              <ImgLoader imageURL={poster} infoCard />
            </Wrapper>
          </div>
          <div className="col-lg-8">
            <Details {...this.state} />
          </div>
        </>
      );
    }
    return info;
  }
}

export default withRouter(Info);
