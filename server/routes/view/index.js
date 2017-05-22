'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import thunkMiddleware from 'redux-thunk'  
import routes from '../../../src/routes';
import renderLayout from '../../views/layout';
import reducers from '../../../src/reducers';
import {
  ReduxAsyncConnect,
  loadOnServer,
} from 'redux-connect';


exports = module.exports = (req, res, next) => {
  // match against front-end route
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      
      if (err) return next(err)

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }

      if (!renderProps) {
        return next(new Error('Missing render props'))
      }

      const components = renderProps.components
      
      // If the component being shown is our 404 component, then set appropriate status
      if (components.some((c) => c && c.displayName === 'error-404')) {
        res.status(404)
      }

    
      // const Comp = components[components.length - 1].WrappedComponent
      // const fetchData = (Comp && Comp.fetchData) || (() => Promise.resolve())

      const initialState = {}
      const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
      const { location, params, history } = renderProps

      const promises = []
      components.forEach(c=>{
          if (c.fetchData) {
            promises.push(c.fetchData({ store, location, params, history }))
          }
        })

      Promise.all(promises)
        .then(() => {
          console.log(promises)
          const body = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )

          
          res.send(renderLayout(body, store.getState()))

        })
        .catch((err) => next(err))
      
    })

 
};
