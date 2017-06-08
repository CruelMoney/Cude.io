import React from 'react';
import styles from './index.scss'

class Button extends React.Component {
  state={hover:false}

  render() {
    return (
   
     <button
        {...this.props}
        className={styles.button}
        style={{
          ...this.props.style,
          borderColor: this.props.mainColor,
          backgroundColor: this.state.hover ? this.props.mainColor : "transparent",
          color: this.state.hover ? this.props.hoverTextColor : this.props.mainColor
        }}
        onMouseEnter={()=>{
          this.setState({hover:true})
          this.props.onMouseEnter && this.props.onMouseEnter()
        }}
        onMouseLeave={()=>{
          this.setState({hover:false})
          this.props.onMouseLeave && this.props.onMouseLeave()
        }}
          >
          {this.props.href ? 
          <a
          {...this.props}
          style={null}
          className={null}
          >
          {this.props.children}
          </a>
          :   
          this.props.children
          }
        
        </button>
    );
  }
}

export default Button

