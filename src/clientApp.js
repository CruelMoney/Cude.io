import './assets/js/classList.polyfill.js' 
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './app';
require('smoothscroll-polyfill').polyfill(); //Only client does not work on server


export default class ClientApp extends React.Component{
    
    render(){
        return(
            <BrowserRouter>
            <App/>
            </BrowserRouter>
         )
    }
}
  
       
  

