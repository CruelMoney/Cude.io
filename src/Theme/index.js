import React from 'react';
import Homepage from './pages/HomePage/index'
import Unsupported from './pages/Unsupported'
import {connect} from 'react-redux'

import 'cude-cms/build/index.css'; //cms style
import './assets/css/style.css'; //theme style

class Index extends React.Component {
  render() {
    return(
      this.props.unsupported ?
      <Unsupported /> 
      :
      <Homepage />
    )
  }
}

const stateToProps = (state, ownprops) =>{
  return{
    unsupported: state.other.unsupported
  }
}

export default connect(stateToProps)(Index);