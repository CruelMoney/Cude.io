import React from 'react';
import Index from './Theme/index';
import AdminOverlay from './CMS/pages/AdminOverlay/index'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import './CMS/assets/css/cms.scss'; //CMS style

class App extends React.Component {
  
  static childContextTypes = {
    staticContext: PropTypes.object
  }
  
  getChildContext() {
    return {staticContext: this.props.staticContext};
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
    <main>
      <AdminOverlay>
        <Route exact path="/" component={Index}/>
      </AdminOverlay>
    </main>
    );
  }
}


const wrappedApp = (props) => {
  return (
    <Route path="/" component={App}/>
  )
}

export default wrappedApp;


