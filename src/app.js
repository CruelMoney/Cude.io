import React from 'react';
import HomePage from './pages/HomePage/index';
import CaseOverview from './pages/CaseOverview/index';
import AdminOverlay from './pages/AdminOverlay/index'
import { Route } from 'react-router-dom'
import {PropTypes} from 'prop-types'
import fetcher from './higher-order-components/Fetcher/index'
import './assets/css/cms.scss'; //CMS style
import './assets/css/style.scss'; //theme style

class App extends React.Component {
  
  static childContextTypes = {
    staticContext: PropTypes.object
  }
  
  getChildContext() {
    return {staticContext: this.props.staticContext};
  }

  render() {
    
    return (
      <main>
      <AdminOverlay>
        <Route exact path="/" component={HomePage}/>
        <Route path="/cases" component={CaseOverview}/>
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


