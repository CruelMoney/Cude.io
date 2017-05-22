import React from 'react';
import {
  Route,
  IndexRoute,
  Redirect,
} from 'react-router';

import App from './app';
import HomePage from './pages/HomePage/index';
import CounterPage from './pages/CounterPage/index';
import BlogLandingPage from './pages/BlogLandingPage/index';
import PostPage from './pages/PostPage/index';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage}>
      <Route path='/counter/:count' />
    </Route>
    <Route path='/posts' component={BlogLandingPage}>
        <Route path='/posts/:postID' component={PostPage} />
    </Route>
  </Route>
);
