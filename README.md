# Cude CMS

**Work in progress**

## Features

React server side rendering with populating initial redux state. 
Automatic model creations in DB thanks to keystone. 
Automatic API endpoints for models. A model has to be enabled before endpoint is available. 
Using create-react-app for building optimised bundles.
Environment variables starting with REACT_APP available at client.

## Setup

* `clone`
* `yarn install`
* `mkdir mongo_data`
* `mkdir mongo_data/db`

To run project you must run

* `yarn run mongod` to start a mongo instance
* `yarn run webpack` to start webpack
* `yarn run dev-start`  to start server (with `babel-node`)

## Building for Production

`yarn run build`

## Run production build

`yarn start`
