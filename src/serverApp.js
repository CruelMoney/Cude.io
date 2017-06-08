import React from 'react'
import { createStore, applyMiddleware } from 'redux' 
import reducers from './reducers'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import DocumentMeta from 'react-document-meta'
import App from './app'

const htmlToString = (store, req, context) => {
    return renderToString(
       <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    )
}

const render = (initialState, req, htmlTemplate) => {
  return new Promise((resolve, reject) => {
    const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
    var context = {store, promises:[]}

    //  Render the app using the context and store
    const body = htmlToString(store, req, context)

    // All components having promises are now fetching data
    Promise.all(context.promises)
      .then(() => {

        context.resolved = true 
        // Rendering AGAIN with new store. Stupid performance wise. OK for less code
        // A better way could be to use a router config as specified in react-router 4 docs
        const body = htmlToString(store, req, context)

        // Get meta data
        const meta = DocumentMeta.renderAsHTML();

        // Crate new html
        var RenderedApp = htmlTemplate.replace('{{app}}', body)
        RenderedApp = RenderedApp.replace('{{initialState}}', JSON.stringify(store.getState()))
        RenderedApp = RenderedApp.replace('{{meta}}', meta)

        // Serve it. Bon appetite
        resolve(RenderedApp)
      })
      .catch((err) => reject(err))
    })
} 

export {render}

