'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../../../build/static/js/app';
import { matchPath } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'  
import reducers from '../../../src/reducers';
import path from 'path';
import fs from 'fs';
import DocumentMeta from 'react-document-meta';


exports = module.exports = (req, res, next) => {
  const filePath = './build/main.html'
  
  var locals = res.locals;


  //Read the react created html file
  fs.readFile(filePath, 'utf8', (err, htmlTemplate)=>{
    
    // Create store and context to be populated one first render
    const initialState = {adminOverlay: {user: locals.user}}
    const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
    const context = {store, promises:[]}


    //  Render the app using the context and store
    const body = renderToString(
       <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    )

    console.log("rendered")

    // All components having promises are now fetching data
    Promise.all(context.promises)
      .then(() => {



        // Rendering AGAIN with new store. Stupid performance wise. OK for less code
        // A better way could be to use a router config as specified in react-router 4 docs
        const body = renderToString(
       <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    )

        // Get meta data
        const meta = DocumentMeta.renderAsHTML();

        // Crate new html
        var RenderedApp = htmlTemplate.replace('{{app}}', body)
        RenderedApp = RenderedApp.replace('{{initialState}}', JSON.stringify(store.getState()))
        RenderedApp = RenderedApp.replace('{{meta}}', meta)

        // Serve it. Bon appetite
        res.send(RenderedApp)
      })
      .catch((err) => next(err))

  })
 
};
