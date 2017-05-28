import React from 'react';
import styles from './index.scss'

class Image extends React.Component {
  state={
    loaded:false
  }

  render() {


    return (
        <img 
        {...this.props}
        ref={(i=>{
          if(i && i.complete && !this.state.loaded){
            this.setState({loaded:true})
          }
        })}
        className={
          (this.props.className ? this.props.className : "") + 
          (this.state.loaded ? styles.loaded : "")
          }
        onLoad={(()=>{
          this.setState({loaded:true})
          if (this.props.onLoad) this.props.onLoad()
          })}
        
       />
    );
  }
}

export default Image

