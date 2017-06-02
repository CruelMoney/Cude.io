'use strict';
const path = require( 'path')
const fs = require( 'fs')
const getGhContribStats = require( 'github-contrib-stats')
const dataFecther = require( './externalDataFetcher')
const {render} = require('../../../build/server/htmlToString')

exports = module.exports = (req, res, next) => {
  const filePath = '../build/main.html'
  
  var locals = res.locals;

  //Read the react created html file
  fs.readFile(filePath, 'utf8', async (err, htmlTemplate)=>{
    
    // Create store and context to be populated one first render
    var initialState = {
      adminOverlay: {
        user: locals.user
      },
    }

    try {
        //initialState = await dataFecther(initialState)
        const RenderedApp = await render(initialState, req, htmlTemplate)
        res.send(RenderedApp)
    } catch (error) {
        next(error)
    }
  
  })
 
};