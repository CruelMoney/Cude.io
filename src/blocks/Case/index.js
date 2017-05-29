import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import Image from '../../components/LoadingImage/index';
import Close from '../../assets/icons/cross.svg'

import styles from './index.scss'

var animationDelay = true
var timer = null

class Case extends React.Component {
  
  state={active:false}
  active=false

  images = []

  handleMouseMove = (event, theRef)=>{
      if(!event.setActive && !this.state.active){
        if (timer) {
          clearTimeout( timer )
        }
        timer = window.setTimeout(()=>{
          animationDelay = true
          theRef.style.transition = "0.2s";
        }, 500)

        if(animationDelay){
          animationDelay = false
          theRef.style.transition = "0.2s";
          setTimeout(()=>{
            theRef.style.transition = null
          }, 300)
        }

      

        event = event || window.event;
        var containerWidth = parseInt( theRef.offsetWidth );
        var containerHeight = parseInt( theRef.offsetHeight );
        var ratio = 0.1;

        //relative to case center, normalized
        var x = (event.pageX - (theRef.offsetLeft+containerWidth/2))/(containerWidth/2);
        var y = (event.pageY - (theRef.offsetTop+containerHeight/2))/(containerHeight/2);
        x = x*ratio
        y = y*ratio

      
          const transformation = `
          matrix3d( 1,    0,    ${x}, 0,
                    0,    1,    ${y}, 0,
                    ${x}, ${y}, 1,    0,
                    0,    0,    100,  1)
          `

          theRef.style.webkitTransform = transformation;
          theRef.style.transform = transformation;
       }else if(!this.state.active){
        
        theRef.style.overflow = "scroll"
        theRef.style.overflowX = "hidden"

        this.setState({active:true})
        document.documentElement.style.overflow = "hidden"
        window.scroll({left:0, top: theRef.offsetTop,  behavior: 'smooth' });
       }

  }

  handleClose = ()=>{
    this.setState({active:false})

    document.documentElement.style.overflow = "auto"
   
    this.case.scroll({left:0, top: 0,  behavior: 'smooth' });

    setTimeout(()=>{
      this.case.style.overflow = "initial"
      this.case.style.overflowX = "initial"
    },500)
  }


  case = null

  render() {
    if(this.state.active){
      
    }


    return (
      <div>
        {
          this.state.active ?
          <Close
          onClick={()=>this.handleClose()}
           className={styles.closeButton}
           />
          : null
        }
      <section
        ref={theCase=> {
            if(theCase){
              this.case = theCase
              theCase.onmousemove = (event) => this.handleMouseMove(event, theCase)
            }
        }} 
        className={styles.case + " " + (this.state.active ? styles.active : "")}
        >

        

        <div className={styles.bg} >
            <div style={{backgroundColor: this.props.case.primaryColor}}></div>
        </div>
            
        <div 
        className={styles.images}>
        {
          this.props.case.images.map((img)=>{
            return  <div 
                      ref={i=>this.images.push(i)}
                      key={img._id}
                      className={styles.imgWrapper}>
                      <Image src={img.secure_url} alt=""/> 
                    </div>
          })
        }
        </div>
        
        
        <div 
          
          className={styles.info}>
          <div 
            style={{backgroundColor: this.props.case.primaryColor}}
            className={styles.bg} />
          <h3>
            {this.props.editMode ?
            <textarea
              defaultValue=  {this.props.case.title}
              onChange={(event)=>this.props.registerEdits(this.props.case._id,{title:event.target.value})}
            />
            : 
            this.props.case.title
            }
          </h3>

          <ul>
            {
              this.props.case.categories.map(c=>{
                return  <li className={styles.pill}>
                          {c.name}
                        </li>
              })
            }
          </ul>

          <div
            dangerouslySetInnerHTML={{__html: this.props.case.content.brief}}
          />

          <button
            onClick={(event)=>{

                this.handleMouseMove({setActive:true}, this.case)
              
              }}
          >
            READ MORE
          </button>


        </div>
      </section>
      </div>
    );
  }
}

export default editor(Case, '/api/cases')

