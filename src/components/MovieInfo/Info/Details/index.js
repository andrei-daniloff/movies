import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import star from '../../../../images/star.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 5px;
`;

const Release = styled.p`
  font-size: 1rem;
  margin: 10px 0;
`;

const Rate = styled.span`
  display: flex;
  img {
    width: 1rem;
  }
`;

const Duration = styled.span``;

const Overview = styled.p``;

const Links = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  &:hover {
    border: 1px dashed #ccc;
  }
  &:active {
    border: 1px dashed #ccc;
    color: black;
    transform: scale(0.9);
  }
  &:nth-child(2n) {
    margin-left: 10px;
    margin-right: 10px;
  }
  &:visited {
    color: black;
  }
  &:link {
    color: black;
  }
`;

const Details = ({ title, genres, overview, duration, release_date, rate }) => {
  const stars = [];
  for (let i = 1; i <= Math.round(rate); i += 1) {
    stars.push(<img src={star} alt="star" />);
  }
  const genresLinks = genres.map(genre => (
    <StyledLink
      key={genre.id}
      to={{
        pathname: `/genres/${genre.name}`,
        search: `?id=${genre.id}&page=1`
      }}
    >
      {genre.name}
    </StyledLink>
  ));
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Rate>{stars}</Rate>
      <Release>
        Release date: <span>{release_date}</span>
      </Release>
      <Duration>Duration: {duration} min</Duration>
      <Overview>{overview}</Overview>
      <Links>{genresLinks}</Links>
    </Wrapper>
  );
};

Details.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  release_date: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired
};

export default Details;
