'use strict';
const path = require( 'path')
const fs = require( 'fs')
const {render} = require('../../../public/build/server/serverRender')

exports = module.exports = async (req, res, next) => {
  // Create store and context to be populated one first render
  var initialState = {
    adminOverlay: {
      user: res.locals.user,
      publicURL: process.env.PUBLIC_URL
    },
  }

  try {
        //  TODO  move this fetching to the frontend
       // initialState = await dataFecther(initialState) 
      const RenderedApp = await render(initialState, req, res)
      res.send(RenderedApp)
  } catch (error) {
      next(error)
  }
 
};