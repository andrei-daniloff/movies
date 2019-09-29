import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: white;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "30rem" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 2rem;
  height: 2rem;
  border-radius: 10rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`
 

class Seacrh extends Component {
  constructor(props){
    super(props)
    this.state = {
      request: '',
      barOpened: false,
    };
    this.inputFocus = React.createRef();
    this.formRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount(){
    document.removeEventListener("mousedown", this.handleClick);
  }
  
  handleClick = (e) => {
    if (this.formRef.current.contains(e.target)) {
      // click was inside form, do nothing
      return;
    }
    this.setBarClose()
  }

  onChangeReq = (value) => {
    this.setState({request: value})
  }

  setBarOpened = () => {
    this.setState({barOpened: true })
  }

  setBarClose = () => {
    this.setState({barOpened: false })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const {request} = this.state;
    if (request !== ''){
      const copy = request;      
      this.setState({request: '', barOpened: false}, () => this.props.history.push({
        pathname: `/search/${copy}`,
        search: '?page=1'
      }))
    }
  }

  render() {
    const { onChangeReq, onFormSubmit, setBarOpened } = this;
    const { request, barOpened } = this.state;
    return (
      <div className="App">
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
          icon
        </Button>
        <Input
          onChange={e => onChangeReq(e.target.value)}
          ref={this.inputFocus}
          value={request}
          barOpened={barOpened}
          placeholder="Search for a movie..."
        />
      </Form>
    </div>
    );
  }
}

export default withRouter(Seacrh);
