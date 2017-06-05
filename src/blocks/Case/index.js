import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import Image from '../../components/LoadingImage/index';
import Close from '../../assets/icons/cross.svg'
import { Grid, Row, Col } from 'react-flexbox-grid';
import  {   rgbToHex,
            hexToRgb,
            throttle,
            debounce
        } from '../../utils/helperFunctions'

import styles from './index.scss'

class Case extends React.Component {

  componentWillMount(){
    var rgb = {r:255,g:255,b:255}

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
        event = event || window.event;
        var containerWidth = parseInt( theRef.offsetWidth );
        var containerHeight = parseInt( theRef.offsetHeight );
        var ratio = 10;


        //relative to case center, normalized
        var x = (event.pageX - (theRef.offsetLeft+containerWidth/2))/(containerWidth/2);
        var y = (event.pageY - (theRef.offsetTop+containerHeight/2))/(containerHeight/2);


        x = x*ratio
        y = y*ratio

      
        const transformation = `
        rotateX(${-y}deg) rotateY(${x}deg)
        `

        this.case.style.webkitTransform = transformation;
        this.case.style.transform = transformation;

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
      this.wrapper.classList.add(styles.finished);
      this.setState({animationFinished:true})
      this.wrapper.style.backgroundColor = "#111111"
      this.case.style.webkitTransform = "none";
      this.case.style.transform = "none";
  }

  closeCase=()=>{
    this.active = false    
    this.wrapper.classList.remove(styles.finished);
    this.wrapper.classList.remove(styles.active);
    this.wrapper.style.backgroundColor = null

    document.documentElement.style.overflow = "auto"

    //Scroll to 100px above case
    var rect = this.wrapper.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollTo = rect.top + scrollTop - 100 
    window.scroll({left:0, top: scrollTo,  behavior: 'smooth' });
    
    setTimeout(()=>{
      this.setState({animationFinished:false})
    },500)
  }

  handleClose = ()=>{
    if (this.wrapper.scrollTop === 0){
      this.closeCase()
    }else{
      var debouncedClosing = debounce(()=> {
        this.closeCase()
        this.wrapper.removeEventListener("scroll", debouncedClosing);
      }, 100);

      this.wrapper.addEventListener("scroll", debouncedClosing);
      this.wrapper.scroll({left:0, top: 0,  behavior: 'smooth' });
      
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
    
         
    const skillsCount = this.props.case.skills.length
    const categoriesCount = this.props.case.categories.length

    return (
      <div 
      ref={wrapper=>{
          if(wrapper){
            this.wrapper = wrapper
            wrapper.onmousemove = throttle(event => this.handleMouseMove(event, wrapper),60)
          }
        }}
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

          
          <div className="fact-overview">
            <div className="fact">
              <span>
                My responsibility:
              </span>
              <ul className={styles.skills}>
              {
                this.props.case.categories.map((c, idx)=>{
                  return  <li 
                  key={this.props.case._id + "-category-"+idx}
                  className={styles.skill}>
                            {c.name + (categoriesCount > idx+1 ? " / " : "")}
                          </li>
                })
              }
            </ul>
            </div>
            <div className="fact">
            <span>
                Technology used:
              </span>
              <ul className={styles.skills}>
              { 
                this.props.case.skills.map((c, idx)=>{
                  return  <li 
                  key={this.props.case._id + "-skill-"+idx}
                  className={styles.skill}>
                            {c.name + (skillsCount > idx+1 ? " / " : "")}
                          </li>
                })
              }
            </ul>
            </div>
          </div>

          

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
    
    <Grid className="container" fluid>
      <section
        ref={theCase=>this.case = theCase}
        className={styles.case}
        >

        

        <div 
       
        className={styles.bg} >
            <div 
            style={{backgroundColor: "#111111"}}></div>
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
      </Grid>
      </div>
    );
  }
}

export default editor(Case, '/api/cases')

