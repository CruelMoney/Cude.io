import React from 'react';
import styles from './index.scss'

class Button extends React.Component {
  state={hover:false}
 
  render() {
    let {mainColor, hoverTextColor, ...rest} = {...this.props}
    return (
   <div 
    {...rest}
   className={styles.wrapper}
    style={{
          ...this.props.style,
          borderColor: this.props.mainColor,
          backgroundColor: this.props.mainColor,
          color: this.state.hover ? this.props.hoverTextColor : this.props.mainColor
        }}
   >
     <div className={styles.hover}></div>
     <button
       
        className={styles.button}
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
          href={this.props.href}
          target={this.props.target}
          style={null}
          className={null}
          >
          {this.props.children}
          </a>
          :   
          this.props.children
          }
        
        </button>
      </div>
    );
  }
}

export default Button

