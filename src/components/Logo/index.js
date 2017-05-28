import React from 'react';
import styles from './index.scss'
import { NavLink } from 'react-router-dom';

class Logo extends React.Component {
  render() {
    return (
      <NavLink to="/">
        <div className={styles.logo}>
            Christopher <br/>
            Ulrick <br/>
            Dengsø 
        </div>
      </NavLink>
    );
  }
}

export default Logo

