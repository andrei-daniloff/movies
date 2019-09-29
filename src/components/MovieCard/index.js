import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImgLoader from '../MovieInfo/Info/Img';
import { animateScroll as scroll } from 'react-scroll';

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 1rem;
`;

const Wrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

class MovieCard extends Component {
  componentDidMount() {
    scroll.scrollToTop();
  }

  render() {
    const { imageURL, id, title } = this.props;
    return (
      <div className="col-xs-offset-2 col-xs-8 col-sm-offset-0 col-sm-6 col-md-offset-0 col-md-4 col-lg-3">
        <Wrapper>
          <ImgLoader imageURL={imageURL} preview id={id} />
          <Title>{title}</Title>
        </Wrapper>
      </div>
    );
  }
}

export default MovieCard;
