import React from 'react';
import styles from './index.scss'
import SadPanda from '../../assets/icons/SadPanda.svg' 

class PandaPlaceholder extends React.Component {
  render() {
    return (
      <div className={styles.placeholder}>
        <p>
            Looks like there's nothing here yet.
        </p>
        <SadPanda />
      </div>
    );
  }
}

export default PandaPlaceholder

