import React from 'react';
import Homepage from './pages/HomePage/index'
import 'cude-cms/build/index.css'; //cms style
import './assets/css/style.css'; //theme style

export default class Index extends React.Component {

  render() {
    return (
        <Homepage />
    );
  }
}