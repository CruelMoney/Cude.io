import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import  * as a  from './actions';
import Case from '../../blocks/Case'

const mapStateToProps = (state, ownProps) => {
  return {
    user:  state.adminOverlay.user || {},
    edits: state.adminOverlay.edits || {}
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { 
    toggleEditmode: () => dispatch(a.toggleEditmode()),
    saveEdits: (edits) => dispatch(a.saveEdits(edits)) 
  }
}

class CaseOverview extends React.Component {
  
  render() {
    return (
      <div className="admin-overlay">
        {
          this.props.user.canAccessKeystone ?
          <div>
            Welcome {this.props.user.name.first}
            <button 
              onClick={this.props.toggleEditmode}
              className="toggle-editmode">
             EDIT
            </button>
            <button 
              onClick={()=>this.props.saveEdits(this.props.edits)}
              className="save-edits">
             SAVE
            </button>
          </div>
          : null
        }

        {this.props.children}

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseOverview)
