import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import  * as a  from './actions';
import Case from '../../blocks/Case'
import PullDown from '../../assets/icons/pull-down.svg'

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

class CaseOverview extends React.Component {
  
  
  render() {
    return (
      <div className={"admin-overlay" +  (this.props.user.canAccessKeystone ? " active" : "")}>
        
        {
          this.props.user.canAccessKeystone ?
          
          <div className="admin-controls-wrapper">
            
          <PullDown />

          <div className="admin-controls">
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

          : null
        }

        {this.props.children}

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseOverview)
