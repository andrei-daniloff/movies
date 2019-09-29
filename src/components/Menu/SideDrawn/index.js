import React from 'react';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import BurgerButton from '../../UI/BurgerButton';
import Error from '../../Error';
import Spinner from '../../UI/Spinner';

const Wrapper = styled.div`
  overflow: auto scroll;
  position: fixed;
  height: 100%;
  width: 300px;
  background-color: #000;
  opacity: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(-100vw);
  transition: all 0.5s ease 0s;
  margin-left: -8px;
  z-index: 100;
  @media (max-width: 575px) {
    width: 100%;
  }
  .active {
    border: 1px solid #fff;
    border-radius: 10px;
  }
  ${props =>
    props.openMenu &&
    css`
      opacity: 0.9;
      transition: all 0.3s linear;
      transform: translateX(0);
    `}
`;

const WrapperBurgerButton = styled.div`
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

const DisplayFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideDrawn = ({ list, openMenu, onOpenMenu, error }) => {
  let genres;
  if (!list) {
    genres = <Spinner />;
  } else {
    genres = list.map(genre => (
      <Link
        key={genre.id}
        to={{
          pathname: `/genres/${genre.name}`,
          search: `?page=1&id=${genre.id}`
        }}
      >
        {genre.name}
      </Link>
    ));
  }
  return (
    <Wrapper openMenu={openMenu}>
      <WrapperBurgerButton>
        <BurgerButton func={onOpenMenu} menu />
      </WrapperBurgerButton>
      {error ? (
        <Error>{error}</Error>
      ) : (
        <>
          <GenresTitle>Discover</GenresTitle>
          <DisplayFlex onClick={onOpenMenu}>
            <Link to="/discover/Popular/?page=1">Popular</Link>
            <Link to="/discover/Upcoming/?page=1">Upcoming</Link>
            <Link to="/discover/Top_rated/?page=1">Top Rated</Link>
          </DisplayFlex>
          <GenresTitle>Genres</GenresTitle>
          <DisplayFlex onClick={onOpenMenu}>{genres}</DisplayFlex>
        </>
      )}
    </Wrapper>
  );
};

SideDrawn.propTypes = {};

export default SideDrawn;
