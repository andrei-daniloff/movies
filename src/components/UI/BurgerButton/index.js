import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 35px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  div {
    width: 90%;
    height: 3px;
    background-color: #868282;
  }
`;

const BurgerButton = () => (
  <Wrapper>
    <div />
    <div />
    <div />
  </Wrapper>
);

BurgerButton.propTypes = {
  show: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired
};

export default BurgerButton;
