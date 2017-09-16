import React from 'react';
import Index from './Theme/index';
import {AdminOverlay} from 'cude-cms';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class App extends React.Component {
  static childContextTypes = {
    staticContext: PropTypes.object
  }

  // Static content is used by components to check if server rendering
  getChildContext() {
    return {staticContext: this.props.staticContext};
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <AdminOverlay>
        <Route exact path="/" component={Index}/>
      </AdminOverlay>
    );
  }
}


const wrappedApp = (props) => {
  return (
    <Route path="/" component={App}/>
  )
}

export default wrappedApp;
