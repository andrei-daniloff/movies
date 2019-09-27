import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import rocket from '../../images/rocket.svg';

const Img = styled.img`
  width: 100%;
  border-radius: 5px 5px 0px 0px;
  height: 25rem;
  opacity: ${props => props.loading ? '0' : '1'};
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 1rem;
`;

const Wrapper = styled.div`
  margin: 10px 0;
  box-shadow: 0 0px 10px #a2a2a2;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const IMAGE_API = 'https://image.tmdb.org/t/p/w342';

class MovieCard extends Component {
  state = {
    loading: true
  }
  render() {
    const { imageURL, id, title } = this.props;
    const {loading} = this.state;
    let image = `${IMAGE_API}${imageURL}`;

    return (
      <div className="col-xs-offset-2 col-xs-8 col-sm-offset-0 col-sm-6 col-md-offset-0 col-md-4 col-lg-3">
        <Wrapper>
          <Img 
               loading={loading} 
               src={`${IMAGE_API}${imageURL}`} 
               onLoad={()=> this.setState({loading: false})} 
               alt="poster"
               onError={e => {
                 this.setState({loading: false});
                 if (e.target.src !== rocket) {
                   e.target.src = rocket
                 }
               }}
          />
          <Title>{title}</Title>
        </Wrapper>
      </div>
    );
  }
}

export default MovieCard;
