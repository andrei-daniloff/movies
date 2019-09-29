import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? '1rem' : '0rem')};
  border: none;
  color: white;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  width: ${props => (props.barOpened ? '15rem' : '1.2rem')};
  cursor: ${props => (props.barOpened ? 'auto' : 'pointer')};
  padding: ${props => (props.barOpened ? '1.2rem 1.2rem 1.2rem 0.6rem' : '1.2rem')};
  height: 1.2rem;
  border-radius: 10rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? 'auto' : 'none')};
  cursor: ${props => (props.barOpened ? 'pointer' : 'none')};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;

class Seacrh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
      barOpened: false
    };
    this.inputFocus = React.createRef();
    this.formRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    if (this.formRef.current.contains(e.target)) {
      return;
    }
    this.setBarClose();
  };

  onChangeReq = value => {
    this.setState({ request: value });
  };

  setBarOpened = () => {
    this.setState({ barOpened: true });
  };

  setBarClose = () => {
    this.setState({ barOpened: false });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { request } = this.state;
    if (request !== '') {
      const copy = request;
      this.setState({ request: '', barOpened: false }, () =>
        this.props.history.push({
          pathname: `/search/${copy}`,
          search: '?page=1'
        })
      );
    } else {
      this.setBarClose();
    }
  };

  render() {
    const { onChangeReq, onFormSubmit, setBarOpened } = this;
    const { request, barOpened } = this.state;
    return (
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened();
          this.inputFocus.current.focus();
        }}
        onSubmit={e => onFormSubmit(e)}
        ref={this.formRef}
      >
        <Button type="submit" barOpened={barOpened}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            style={{ width: '14px' }}
            className="svg-inline--fa fa-search fa-w-16 fa-1x "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </Button>
        <Input
          onChange={e => onChangeReq(e.target.value)}
          ref={this.inputFocus}
          value={request}
          barOpened={barOpened}
          placeholder="Search for a movie..."
        />
      </Form>
    );
  }
}

export default withRouter(Seacrh);
