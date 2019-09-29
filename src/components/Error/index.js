import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
  ${props =>
    props.center &&
    css`
      color: #000;
      margin: auto;
    `}
`;

const Text = styled.p`
  text-align: center;
`;

const ErrorHandler = ({ center = false, children }) => {
  return (
    <Wrapper center={center}>
      <Text>{children}</Text>
    </Wrapper>
  );
};

export default ErrorHandler;
