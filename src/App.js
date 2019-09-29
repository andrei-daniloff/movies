import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './containers/Home';
import Menu from './components/Menu';
import Spinner from './components/UI/Spinner';

const Movie = lazy(() => import('./containers/MovieInfo'));

class App extends Component {
  state = {
    listGenres: null,
    openMenu: false,
    error: null
  };

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=8c7720742602f6274d23061fa907cb34&language=en-US'
      )
      .then(res => this.setState({ listGenres: res.data.genres }))
      .catch(err => this.setState({ error: err.response.data.status_message }));
  }

  onOpenMenu = () => {
    this.setState(prevState => ({ openMenu: !prevState.openMenu }));
  };

  render() {
    const { listGenres, openMenu, error } = this.state;
    const { onOpenMenu } = this;
    return (
      <div className="container">
        <Suspense fallback={<Spinner />}>
          <Menu error={error} list={listGenres} onOpenMenu={onOpenMenu} openMenu={openMenu} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect from="/" to="/discover/Popular/?page=1" />}
            />
            <Route path="/discover/:genre" component={Home} />
            <Route path="/genres/:genre" component={Home} />
            <Route path="/search/:request" component={Home} />
            <Route path="/movie/:id" component={Movie} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

App.propTypes = {};

export default withRouter(App);
