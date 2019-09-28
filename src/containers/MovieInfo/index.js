import React, { Component } from 'react';
import Actors from '../../components/MovieInfo/Actors';
import Info from '../../components/MovieInfo/Info';

class MovieInfo extends Component {
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
