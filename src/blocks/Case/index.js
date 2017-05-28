import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import Image from '../../components/LoadingImage/index';

import styles from './index.scss'

function mouseParallax (theRef, mouseX, mouseY, speed ) {
	var obj = theRef
	var parentObj = obj.parentNode;
  var left = theRef.offsetLeft;
  var top = theRef.offsetTop
	var containerWidth = parseInt( parentObj.offsetWidth ),
	containerHeight = parseInt( parentObj.offsetHeight );
  var transform = "rotate3d(" + mouseX + "," + mouseY + ", 0, 30deg)";
  theRef.style.webkitTransform = transform;
  theRef.style.transform = transform;
}

var animationDelay = true
var timer = null

function handleMouseMove(event, theRef){
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
    
}

class Case extends React.Component {
  
  images = []

  render() {
    return (
      <section
        ref={theCase=> {
            if(theCase){
              theCase.onmousemove = (event) => handleMouseMove(event, theCase)
            }
        }}
          
        className={styles.case}
        style={{backgroundColor: this.props.case.primaryColor}}
        >
        
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

        </div>
      </section>
    );
  }
}

export default editor(Case, '/api/cases')

