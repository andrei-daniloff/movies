import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BurgerButton from '../UI/BurgerButton';
import SideDrawn from './SideDrawn';

const Wrapper = styled.div`
  margin: 10px 0;
  height: 3rem;
`;

const Menu = ({ list, openMenu, onOpenMenu }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <SideDrawn list={list} openMenu={openMenu} onOpenMenu={onOpenMenu} />
        <Wrapper>
          <BurgerButton func={onOpenMenu} />
        </Wrapper>
      </div>
    </div>
  );
};

// Menu.propTypes = {};

export default Menu;
