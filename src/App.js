import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Home from './containers/Home';
import Menu from './components/Menu';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'

class App extends Component {
  state = {
    listGenres: null,
    openMenu: false
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=8c7720742602f6274d23061fa907cb34&language=en-US')
    .then(res => this.setState({listGenres:res.data.genres}))
    .catch(err => console.log(err))
  }

  onOpenMenu = () => {
    this.setState((prevState) => ({openMenu: !prevState.openMenu}))
  }
  
  render() {
    const {listGenres, openMenu} = this.state;
    const {onOpenMenu} = this;
    return (
      <div className="container">
        <Menu list={listGenres} onOpenMenu={onOpenMenu} openMenu={openMenu}/>
        <Switch>
          <Route path="/" exact render={() => <Redirect from="/" to="/discover/Popular" />} />
          <Route path="/discover/:genre" component={Home} />
          <Route path="/genres/:genre" component={Home} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {};

export default withRouter(App);
