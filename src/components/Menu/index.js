import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BurgerButton from '../UI/BurgerButton';
import SideDrawn from './SideDrawn';
import Search from '../Search';

const Wrapper = styled.div`
  margin: 10px 0;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = ({ list, openMenu, onOpenMenu, error }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <SideDrawn error={error} list={list} openMenu={openMenu} onOpenMenu={onOpenMenu} />
        <Wrapper>
          <BurgerButton func={onOpenMenu} />
          <Search />
        </Wrapper>
      </div>
    </div>
  );
};

// Menu.propTypes = {};

export default Menu;
