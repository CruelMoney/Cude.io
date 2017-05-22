'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import thunkMiddleware from 'redux-thunk'  
import App from '../../../src/app';
import reducers from '../../../src/reducers';
import path from 'path';
import fs from 'fs';
import DocumentMeta from 'react-document-meta';


exports = module.exports = (req, res, next) => {
  const filePath = './build/main.html'

  fs.readFile(filePath, 'utf8', (err, htmlTemplate)=>{
    const initialState = {}
    const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))

    const context = {store, promises:[]}

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
        const meta = DocumentMeta.renderAsHTML();

        var RenderedApp = htmlTemplate.replace('{{app}}', body)
        RenderedApp = RenderedApp.replace('{{initialState}}', JSON.stringify(store.getState()))
        RenderedApp = RenderedApp.replace('{{meta}}', meta)

        res.send(RenderedApp)
      })
      .catch((err) => next(err))

  })
 
};
