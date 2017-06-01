import React from 'react';
import DBText from '../../components/DBText/index'
import styles from './index.scss'


class Widget extends React.Component {


  render() {
    return (
      <div className={styles.wrapper}> 
        {this.props.contributions}
        <DBText 
        className={styles.text}
        dbKey="github-widget-text"/>
      </div>
    );
  }
}

export default Widget





