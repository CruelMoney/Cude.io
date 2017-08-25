import React from 'react';
import style from './index.module.css'

/**
 * A class that only pulls the image when it is in viewport
 */
export default class OtherProjects extends React.Component {
  
  state={
    full: false,
    loaded: false
  }

  startObserving=(ref)=>{
    if(!window.cudeIntersectionObserver){
      var options = {
        root: null,
        rootMargin: "0px",
        threshold: [1.0, 0]
      };
      
      const createInter = (_ =>{
        window.cudeIntersectionObserver = new IntersectionObserver(entries=>{
          for(const entry of entries){
            if(entry.intersectionRatio === 1){
              entry.target.setAttribute("intersected", '')
              entry.target.revealMethod()
            }
          }
        },options)  
      })()
      
    }

    const registerInter = (_ =>{
      ref.revealMethod = _ => {this.setState({full:true})}
      window.cudeIntersectionObserver.observe(ref)
    })()
   
  }

  componentDidMount(){
    this.startObserving(this.refs.cudeImage)
  }

  componentWillMount(){

  }
  componentWillUnmount(){
    window.cudeIntersectionObserver.unobserve(this.refs.cudeImage)
  }

  render(){
    return(
    <div 
      id={"cude-image-"+this.props.id}
      className={"cude-image" + (this.state.loaded ? " loaded" : "")}
      src={this.props.src} 
      ref="cudeImage">
      {
        this.state.full ?
          <img
            onLoad={()=>this.setState({loaded:true})}
            src={this.props.src} 
            alt=""/>
      : null
      }
    </div>  
  )}
}  