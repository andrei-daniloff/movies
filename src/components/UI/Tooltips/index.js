import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  transition: all 0.3s ease-in-out;
  top: -10%;
  transform: translate(-50%, -50%);
  left: 50%;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  ${props =>
    props.show &&
    css`
      top: 5%;
    `}
`;

const Tooltips = ({ children, show }) => {
  return <Wrapper show={show}>{children}</Wrapper>;
};

export default Tooltips;
