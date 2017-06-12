import React from 'react';
import ReactCursorPosition from 'react-cursor-position';

export default function cursor(WrappedComponent, APIEndpoint) {

    return class Editor extends React.Component {
        render() {
        return (
            <ReactCursorPosition>
                <WrappedComponent {...this.props} />
            </ReactCursorPosition>
            )
        }
    };


}