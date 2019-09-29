import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Seacrh extends Component {
  state = {
    request: null
  }

  onChangeReq = (e) => {
    this.setState({request: e.target.value})
  }

  render() {
    const { onChangeReq } = this;
    const { request } = this.state;
    return (
      <div>
        <Link to={{
          pathname: `/search/${request}`,
          search: '?page=1'
        }}>Click</Link>
        <input type="text" onChange={e => onChangeReq(e)} value={request}/>
      </div>
    );
  }
}

export default Seacrh;
