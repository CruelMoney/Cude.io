import React from 'react';
import { Link } from 'react-router';

const App = (props) =>(
  <section>
    <Link to={'/'}>Home</Link>
    <Link to={'/counter'}>Counter</Link>
    <Link to={'/posts'}>Blog</Link>
    <a href={'/keystone'}>Login</a>
    {props.children}
  </section>
);

export default App;
