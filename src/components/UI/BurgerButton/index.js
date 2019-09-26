import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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
  ${props =>
    props.menu &&
    css`
      height: 40px;
      width: 40px;
      padding: 10px;
      position: relative;
      transform: rotate(180deg);
      div {
        background-color: #fff;
        height: 2px;
      }
      div:nth-child(2) {
        display: none;
      }
      div:nth-child(1) {
        transform: rotate(45deg);
        position: absolute;
        width: 70%;
      }
      div:nth-child(3) {
        transform: rotate(-45deg);
        position: absolute;
        width: 70%;
      }
    `}
`;

const BurgerButton = ({ func, menu = false }) => (
  <Wrapper onClick={func} menu={menu}>
    <div />
    <div />
    <div />
  </Wrapper>
);

BurgerButton.propTypes = {
  menu: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired
};

export default BurgerButton;
