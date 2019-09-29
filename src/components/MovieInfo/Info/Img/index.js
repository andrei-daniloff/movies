import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { withRouter } from 'react-router-dom';
import rocket from '../../../../images/rocket.svg';

const IMAGE_API = 'https://image.tmdb.org/t/p/w342';

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
  height: ${props => props.infoCard ? '35rem' : '25rem'};
  box-shadow: 0 0px 10px #a2a2a2;
  opacity: ${props => (props.loading ? '0' : '1')};
  cursor:  ${props => props.infoCard ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  &:hover {
    transform: ${props => props.infoCard ? 'scale(1)' : 'scale(1.02)'}; 
  }
  ${props => props.infoCard && css`
    @media (max-width: 767px){
      height: 20rem;
    }
    @media (max-width: 575px){
    height: 22rem;
    }
    @media (max-width: 450px){
      height: 17rem;
    }
  `}
  ${props => props.actors && css`
    height: 25rem;
    @media (max-width: 991px){
      height: 20rem;
    }
    @media (max-width: 575px){
      height: 22rem;
    }
    @media (max-width: 450px){
      height: 17rem;
    }
  `}
  @media (max-width: 575px){
    height: 20rem;
  }
  @media (max-width: 450px){
    height: 17rem;
  }
`;
 
class ImgLoader extends Component {
  state = {
    loading: true
  }

  loadMoreInfo = (id) => {
    const {history} = this.props;
    history.push(`/movie/${id}`);  
  }
  render() {
    const { imageURL, preview, id, infoCard, actors} = this.props;
    const { loadMoreInfo } = this;
    const { loading } = this.state;
    return (     
        <Img
          actors={actors}
          infoCard={infoCard}
          onClick={preview ? () => loadMoreInfo(id) : null}
          loading={loading}
          src={`${IMAGE_API}${imageURL}`}
          onLoad={() => this.setState({ loading: false })}
          alt="poster"
          onError={e => {
            this.setState({ loading: false });
            if (e.target.src !== rocket) {
              e.target.src = rocket;
            }
          }}
        /> 
    );
  }
}

export default withRouter(ImgLoader);
