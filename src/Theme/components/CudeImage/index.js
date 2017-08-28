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
    let {ratio, width, height, maxratio} = {...this.props} 
    if(maxratio && ratio > maxratio){
      const margin = width*0.2*2 // 20% subtracted each side
      height = (width-margin)*ratio // new height after margin added
      ratio = height/width // new ratio

    }
    return(
    <div 
      id={"cude-image-"+this.props.id}
      src={this.props.url}
      className={"cude-image" + (this.state.loaded ? " loaded" : "")}
      style={{
        ...this.props.style,
        background: `url(${this.props.thumbnail})`,
        backgroundSize: '100% 100%',
        paddingTop: `${ratio*100}%`,
        margin: `0 ${this.props.ratio > maxratio ? "20%" :""}`
      }}
      ref="cudeImage">
      {
        this.state.full ?
          <img
            onLoad={()=>this.setState({loaded:true})}
            src={this.props.url} 
            alt=""/>
      : null
      }
    </div>  
  )}
}  