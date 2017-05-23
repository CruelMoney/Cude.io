import React from 'react';
import * as a from './actions'
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  return {
    editMode:  state.adminOverlay.editMode
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { registerEdits: (id, edits) => dispatch(a.registerEdits(id, edits)) }
}

class Case extends React.Component {
  render() {
    return (
      <section className="case">
        <h1>
          {this.props.editMode ?
          <textarea
            defaultValue=  {this.props.case.title}
            onChange={(event)=>this.props.registerEdits(this.props.case._id,{title:event.target.value})}
          />
          : 
          this.props.case.title
          }
        </h1>
      </section>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Case)

