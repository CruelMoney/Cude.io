import React from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends React.Component {
  render() {
    return (
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/cases'}>Cases</NavLink>
            <a href={'/keystone'}>Login</a>
        </nav>
        );
        }
    }


export default (Navigation)
