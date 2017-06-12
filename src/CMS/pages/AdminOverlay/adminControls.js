import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import  * as a  from './actions';
import PullDown from '../../assets/icons/pull-down.svg'
import FeedCursor from '../../higher-order-components/CursorPosition/index'
import styles from './index.scss';

const mapStateToProps = (state, ownProps) => {
  return {
    user:  state.adminOverlay.user || {},
    apiData: state.apiData || {}
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { 
    toggleEditmode: () => dispatch(a.toggleEditmode()),
    saveEdits: (apiData) => dispatch(a.saveEdits(apiData)) 
  }
}

class Controls extends React.Component {

    
  render() {
    const arrowVisible = this.props.isActive // comes from feedcursor 

    return (

          <div className={styles.adminControlsWrapper}>

          <PullDown 
            className={styles.pullDownArrow + " " + (arrowVisible ? styles.active : "")}
            onClick={()=>{this.props.toggleCallback(true)}}
            height="80" 
            width="80"/>

          <div className={styles.adminControls}>
            Welcome {this.props.user.name.first}
            <button 
              onClick={this.props.toggleEditmode}
              className="toggle-editmode">
             EDIT
            </button>
            <button 
              onClick={()=>this.props.saveEdits(this.props.apiData)}
              className="save-edits">
             SAVE
            </button>
            <button 
              onClick={()=>this.props.toggleCallback(false)}
              className="hide">
             HIDE
            </button>
            <a 
              className="button-look"
              href="/keystone">
              CMS
            </a>
            <a 
              className="button-look"
              href="/keystone/signout">
              LOGOUT
            </a>
          </div>
          </div>

      
    );
  }
}

export default FeedCursor(connect(mapStateToProps, mapDispatchToProps)(Controls))
