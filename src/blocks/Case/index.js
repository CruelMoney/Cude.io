import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import Image from '../../components/LoadingImage/index';
import Close from '../../assets/icons/cross.svg'

import styles from './index.scss'

var animationDelay = true
var timer = null

class Case extends React.Component {
  state={animationFinished:false}
  active=false

  images = []

  handleMouseMove = (event, theRef)=>{
      if(!event.setActive && !this.active){
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
        var ratio = 10;

        //relative to case center, normalized
        var x = (event.clientX - (theRef.offsetLeft+containerWidth/2))/(containerWidth/2);
        var y = (event.clientY - (theRef.offsetTop+containerHeight/2))/(containerHeight/2);
        x = x*ratio
        y = y*ratio

      
        const transformation = `
        rotateX(${-y}deg) rotateY(${x}deg)
        `

        theRef.style.webkitTransform = transformation;
        theRef.style.transform = transformation;

       }else if(!this.active){

        setTimeout(()=>{
          this.wrapper.classList.add(styles.finished);
          this.setState({animationFinished:true})
          theRef.style.webkitTransform = "none";
          theRef.style.transform = "none";
        },500)

        this.active = true

        this.wrapper.classList.add(styles.active);

        document.documentElement.style.overflow = "hidden"

        var rect = this.case.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollTo = rect.top + scrollTop
        window.scroll({left:0, top: scrollTo,  behavior: 'smooth' });

       }

  }

  handleClose = ()=>{
    this.active = false
    this.wrapper.classList.remove(styles.finished);
    this.wrapper.classList.remove(styles.active);

    document.documentElement.style.overflow = "auto"
   
    this.case.scroll({left:0, top: 0,  behavior: 'smooth' });

    setTimeout(()=>{
      this.setState({animationFinished:false})
    },500)
  }


  case = null
  close = null
  wrapper = null

  render() {
    return (
      <div 
      ref={wrapper=>this.wrapper = wrapper}
      className={styles.wrapper}>

        <div ref={close=>this.close = close}>
          <Close
            onClick={()=>this.handleClose()}
            className={styles.closeButton}
           />
       
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
      <section
        ref={theCase=> {
            if(theCase){
              this.case = theCase
              theCase.onmousemove = (event) => this.handleMouseMove(event, theCase)
            }
        }} 
        className={styles.case}
        >

        

        <div className={styles.bg} >
            <div style={{backgroundColor: this.props.case.primaryColor}}></div>
        </div>

        <h1 
          style={{color:this.props.case.secondaryColor}}
        >
           {this.props.case.title}
         </h1>
            
        <div 
        className={styles.images + " " + "clearfix"}>
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

        {
          this.state.animationFinished ? 
          <div
            className={styles.extendedContent}
            dangerouslySetInnerHTML={{__html: this.props.case.content.extended}}
          />
          :
          null
        }
         
        
        
        
      </section>
      </div>
    );
  }
}

export default editor(Case, '/api/cases')

