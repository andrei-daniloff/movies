import React from 'react';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import BurgerButton from '../../UI/BurgerButton';

const Wrapper = styled.div`
  overflow: auto scroll;
  position: fixed;
  height: 100%;
  width: 300px;
  background-color: #000;
  opacity: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: all 0.3s linear;
  .active {
    border: 1px solid #fff;
    border-radius: 10px;
  }
  ${props =>
    props.openMenu &&
    css`
      opacity: 0.8;
      transition: all 0.3s linear;
      transform: translateX(0);
    `}
`;

const DisplayFlex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Link = styled(NavLink)`
  color: #fff;
  text-align: center;
  padding: 5px 0;
  text-decoration: none;
  margin: 5px auto;
  width: 50%;
`;

const GenresTitle = styled.h3`
  color: #fff;
  text-align: center;
`;

const SideDrawn = ({ list, openMenu, onOpenMenu }) => {
  let genres;
  if (!list) {
    genres = <h1>Loading</h1>;
  } else {
    genres = list.map(genre => (
      <Link
        key={genre.id}
        to={{
          pathname: `/genres/${genre.name}`,
          search: `?id=${genre.id}`
        }}
      >
        {genre.name}
      </Link>
    ));
  }
  return (
    <Wrapper openMenu={openMenu}>
      <DisplayFlex>
        <BurgerButton func={onOpenMenu} menu />
      </DisplayFlex>
      <GenresTitle>Discover</GenresTitle>
      <Link to="/discover/Popular">Popular</Link>
      <Link to="/discover/Top_rated">Top Rated</Link>
      <GenresTitle>Genres</GenresTitle>
      {genres}
    </Wrapper>
  );
};

SideDrawn.propTypes = {};

export default SideDrawn;
