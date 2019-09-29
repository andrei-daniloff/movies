import React, { Component } from 'react';
import Actors from '../../components/MovieInfo/Actors';
import Info from '../../components/MovieInfo/Info';
import { animateScroll as scroll } from 'react-scroll';

class MovieInfo extends Component {
  componentDidMount() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <>
        <div className="row">
          <Info />
        </div>
        <div className="row">
          <Actors />
        </div>
      </>
    );
  }
}

export default MovieInfo;
