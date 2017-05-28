import React from 'react';
import Navigation from './components/Navigation/index';
import DocumentMeta from 'react-document-meta';
import HomePage from './pages/HomePage/index';
import CaseOverview from './pages/CaseOverview/index';
import AdminOverlay from './pages/AdminOverlay/index'
import { Route } from 'react-router-dom'
import {PropTypes} from 'prop-types'
import fetcher from './higher-order-components/Fetcher/index'
import './assets/css/index.scss'; //CMS style
import './assets/css/style.scss'; //theme style

class App extends React.Component {
  
  static childContextTypes = {
    staticContext: PropTypes.object
  }
  
  getChildContext() {
    return {staticContext: this.props.staticContext};
  }

  render() {
    console.log(this.props)
    const meta = {
      title: 'Cude CMS',
      description: 'React, redux, auto API',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };
    return (
      <main>
      <AdminOverlay>
        <header>
          <DocumentMeta {...meta} extend />
          <Navigation 
            twitter={this.props.data.social ? this.props.data.social.social.twitter : ""}
            facebook={this.props.data.social ? this.props.data.social.social.facebook : ""}
            snapchat={this.props.data.social ? this.props.data.social.social.snapchat : ""}
          />
        </header>

        
        <Route exact path="/" component={HomePage}/>
        <Route path="/cases" component={CaseOverview}/>
      </AdminOverlay>
    </main>
    );
  }
}

App = fetcher(App, '/api/configuration')

const wrappedApp = (props) => {
  return (
    <Route path="/" component={App}/>
  )
}

export default wrappedApp;


