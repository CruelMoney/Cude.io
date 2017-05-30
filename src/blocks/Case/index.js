import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import Image from '../../components/LoadingImage/index';
import Close from '../../assets/icons/cross.svg'

import styles from './index.scss'

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

const debounce = (func, wait, immediate) => {
	var timeout;
	return () => {
		var context = this, args = arguments;
		var later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class Case extends React.Component {

  componentWillMount(){
    var rgb = {r:0,g:0,b:0}

    if(this.props.case.primaryColor){
      if (this.props.case.primaryColor.indexOf("#" !== -1)){
        rgb = hexToRgb(this.props.case.primaryColor)
      }else{
        var hex = rgbToHex(this.props.case.primaryColor)
        rgb = hexToRgb(hex)
      }
    } 
    this.primaryColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
    this.primaryColorAlpha = `rgba(${rgb.r},${rgb.g},${rgb.b},0.7)`

    if(this.props.case.secondaryColor){
      if (this.props.case.secondaryColor.indexOf("#" !== -1)){
        rgb = hexToRgb(this.props.case.secondaryColor)
      }else{
        var hex = rgbToHex(this.props.case.secondaryColor)
        rgb = hexToRgb(hex)
      }
    }
    this.secondaryColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
    this.secondaryColorAlpha = `rgba(${rgb.r},${rgb.g},${rgb.b},0.7)`
   
  }

  state={animationFinished:false}
  active=false

  images = []


  handleMouseMove = (event, theRef)=>{
      if(!event.setActive && !this.active){
        setTimeout(()=>{
          this.case.style.transition = null
        },200)

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
        this.openCase()
       }

  }

 openCase=()=>{
        setTimeout(()=>{
          this.animationFinished()
        },500)

        this.wrapper.classList.remove(styles.buttonHover);
        this.active = true
        this.wrapper.classList.add(styles.active);
        document.documentElement.style.overflow = "hidden"
        var rect = this.wrapper.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollTo = rect.top + scrollTop
        window.scroll({left:0, top: scrollTo,  behavior: 'smooth' });
  }

  animationFinished=()=>{
      this.case.style.transition = "transform 0.2s ease"; // remove small jag at end
      this.wrapper.classList.add(styles.finished);
      this.setState({animationFinished:true})
      this.case.style.backgroundColor = this.primaryColorAlpha
      this.case.style.webkitTransform = "none";
      this.case.style.transform = "none";
  }

  closeCase=()=>{
    this.active = false    
    this.wrapper.classList.remove(styles.finished);
    this.wrapper.classList.remove(styles.active);
    this.case.style.backgroundColor = null

    document.documentElement.style.overflow = "auto"
    
    setTimeout(()=>{
      this.setState({animationFinished:false})
    },500)
  }

  handleClose = ()=>{
    if (this.case.scrollTop === 0){
      this.closeCase()
    }else{
      var debouncedClosing = debounce(()=> {
        this.closeCase()
        this.case.removeEventListener("scroll", debouncedClosing);
      }, 100);

      this.case.addEventListener("scroll", debouncedClosing);
      this.case.scroll({left:0, top: 0,  behavior: 'smooth' });
    }
   
   
  }

  buttonHover = () =>{
     this.wrapper.classList.add(styles.buttonHover);
  }
  buttonNoHover = () =>{
     this.wrapper.classList.remove(styles.buttonHover);
  }

  case = null
  close = null
  wrapper = null
  bg = null

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
            style={{
              backgroundColor: this.primaryColor}}
            className={styles.bg} />
          <h3
          style={{
              color:this.secondaryColor}}
          >
            {this.props.editMode ?
            <textarea
              defaultValue=  {this.props.case.title}
              onChange={(event)=>this.props.registerEdits(this.props.case._id,{title:event.target.value})}
            />
            : 
            this.props.case.title
            }
          </h3>

          <h4>
            {this.props.case.subtitle}
          </h4>

          <ul>
            {
              this.props.case.categories.map(c=>{
                return  <li 
                
                className={styles.pill}>
                          {c.name}
                        </li>
              })
            }
          </ul>

          <div
            
            dangerouslySetInnerHTML={{__html: this.props.case.content.brief}}
          />

          <button
          onMouseOut={this.buttonNoHover}
          onMouseOver={this.buttonHover}
          style={{
              borderColor: this.secondaryColor,
              color:this.secondaryColor}}
            onClick={(event)=>{

                this.handleMouseMove({setActive:true}, this.case)
              
              }}
          >
            READ MORE
          </button>

          {this.props.case.link ?
            <a
            target="blank"
            className="button-look"
            href={this.props.case.link}
            onMouseOut={this.buttonNoHover}
            onMouseOver={this.buttonHover}
            style={{
                marginLeft: "10px",
                borderColor: this.secondaryColor,
                color:this.secondaryColor}}
    
          >
            VISIT
          </a>
           : null}
          


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

        

        <div 
       
        className={styles.bg} >
            <div 
            style={{backgroundColor: this.primaryColorAlpha}}></div>
        </div>

        <h1 
          style={{color:this.secondaryColor}}
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

