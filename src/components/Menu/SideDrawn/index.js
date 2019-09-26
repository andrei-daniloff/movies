import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  background-color: #cecece;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
`;

const SideDrawn = ({ list }) => {
  let genres;
  if (!list) {
    genres = <h1>Loading</h1>;
  } else {
    genres = list.map(genre => (
      <NavLink
        key={genre.id}
        to={{
          pathname: `/genres/${genre.name}`,
          search: `?with_genres=${genre.id}`
        }}
      >
        {genre.name}
      </NavLink>
    ));
  }
  console.log(list);
  return <Wrapper>{genres}</Wrapper>;
};

SideDrawn.propTypes = {};

export default SideDrawn;
