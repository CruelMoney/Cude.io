import React from 'react';
import DBText from '../../components/DBText/index'
import styles from './index.scss'
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
      return {
          contributions:  state.other.todaysContributions,
          totalContributions: state.other.totalContributions,
    }
  }
class Widget extends React.Component {


  render() {
    return (
      <div>
      <div className={styles.wrapper}> 
        {this.props.contributions}
        <DBText 
        className={styles.text}
        dbKey="github-widget-text"/>
      </div>
      <div className={styles.wrapper}> 
        {this.props.totalContributions}
        <DBText 
        className={styles.text}
        dbKey="github-widget-text-2"/>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Widget)





