import React from 'react';
import Navigation from './components/navigation';
import DocumentMeta from 'react-document-meta';
import HomePage from './pages/HomePage/index';
import CaseOverview from './pages/CaseOverview/index';
import AdminOverlay from './pages/AdminOverlay/index'
import { Route } from 'react-router-dom'

const App = (props) =>{
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
          <Navigation />
        </header>

        
        <Route exact path="/" component={HomePage}/>
        <Route path="/cases" component={CaseOverview}/>
      </AdminOverlay>
    </main>
) };

export default App;
