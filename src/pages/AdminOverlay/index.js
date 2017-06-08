import React from 'react';
import { Link } from 'react-router';
import styles from './index.scss';
import AdminControls from './adminControls'
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    user:  state.adminOverlay.user || {},
    apiData: state.apiData || {},
    editMode : state.adminOverlay.editMode
  }
}
class Admin extends React.Component {
  state={
    controlsVisible: false, 
  }
  
  render() {

    return (
      <div className={
        styles.adminOverlay + " " +  
        (this.state.controlsVisible ? styles.active : "") + " " + 
        (this.props.editMode ? "edit-mode" : "")}>
        
        {
          this.props.user.canAccessKeystone ?
            
          <AdminControls 
            toggleCallback={(state)=>{this.setState({controlsVisible: state})}}
          />

          : null
        }
          <div className={styles.content}>
            {this.props.children}
          </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Admin)
