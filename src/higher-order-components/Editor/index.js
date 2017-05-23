import { connect } from 'react-redux';
import React from 'react';
import * as a from './actions'

export default function editor(WrappedComponent, APIEndpoint) {
    
    const mapStateToProps = (state, ownProps) => {
        return {
            editMode:  state.adminOverlay.editMode
        }
    }

    const mapDispatchToProps = (dispatch) => {  
        return { registerEdits: (id, edits) => dispatch(a.registerEdits(APIEndpoint, id , edits)) }
    }

    class Editor extends React.Component {
        render() {
        return <WrappedComponent {...this.props} />;
        }
    };

return connect(mapStateToProps, mapDispatchToProps)(Editor)

}