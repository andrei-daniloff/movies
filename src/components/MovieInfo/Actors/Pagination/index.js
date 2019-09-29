import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

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
  .pagination {
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
  }
`;

const Pagination = ({ currentPage, changePage, totalPage }) => {
  return (
    <Wrapper>
      {currentPage === 1 ? null : (
        <Link
          className="pagination"
          to="actors"
          spy={true}
          smooth={true}
          duration={500}
          onClick={() => changePage('prev')}
        >
          Prev
        </Link>
      )}
      <span>{currentPage}</span>
      {currentPage === totalPage ? null : (
        <Link
          className="pagination"
          to="actors"
          spy={true}
          smooth={true}
          duration={500}
          onClick={() => changePage('next')}
        >
          Next
        </Link>
      )}
    </Wrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

export default Pagination;
