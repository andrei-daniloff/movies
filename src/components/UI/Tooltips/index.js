import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: -10%;
  transform: translate(-50%, -50%);
  left: 50%;
  padding: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  z-index: 500;
  ${props =>
    props.show &&
    css`
      top: 20%;
    `}
`;

const Tooltips = ({ children, show }) => {
  return <Wrapper show={show}>{children}</Wrapper>;
};

export default Tooltips;
