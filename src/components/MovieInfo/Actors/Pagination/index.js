import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0px 25px 0px;
  font-size: 1rem;
  span {
    padding: 10px;
    margin: 0px 20px;
    border: 2px dashed #5fb8ff;
    border-radius: 10px;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 2px solid #5fb8ff;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transform: scale(1);
  &:active {
    transform: scale(0.9);
  }
`;

const Pagination = ({ currentPage, changePage, totalPage }) => {
  return (
    <Wrapper>
      {currentPage === 1 ? null : <Button onClick={() => changePage('prev')}>Prev</Button>}
      <span>{currentPage}</span>
      {currentPage === totalPage ? null : <Button onClick={() => changePage('next')}>Next</Button>}
    </Wrapper>
  );
};

export default Pagination;
