import React from 'react';
import editor from '../../../CMS/higher-order-components/Editor/index';
import Image from '../../../CMS/components/LoadingImage/index';
import Close from '../../../CMS/assets/icons/cross.svg'
import Arrow from '../../../CMS/assets/icons/arrow.svg'
import Button from '../../components/Button/index'
import { Grid, Row, Col } from 'react-flexbox-grid';
import  {   rgbToHex,
            hexToRgb,
            throttle,
            debounce
        } from '../../../CMS/utils/helperFunctions'
import {EditableText} from '../../../CMS/components/DBText'
import styles from './index.scss'
import { Watch } from 'scrollmonitor-react';
import PandaPlaceholder from '../../../CMS/components/PandaPlaceholder'


var Case = Watch(class Case extends React.Component {

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

    this.initialTransform = "scale(0.75) translateX(18%)"
    this.buttonHover = false
  }

  state={animationFinished:false}
  active=false

  images = []


  handleMouseMove = (event, theRef)=>{
      if(!event.setActive && !this.active){
        if(!this.buttonHover){
              event = event || window.event;
              var ratio = 10;

              var rect = theRef.getBoundingClientRect();
              //relative to case center, normalized
              var x = (event.clientX - (rect.top+rect.width/2))/(rect.width/2);
              var y = (event.clientY - (rect.top+rect.height/2))/(rect.height/2);


              x = x*ratio
              y = y*ratio

            
              const transformation = `
              rotateX(${-y}deg) rotateY(${x}deg) 
              `+this.initialTransform

              this.case.style.webkitTransform = transformation;
              this.case.style.transform = transformation;
        }
      }else if(!this.active){
        this.openCase()
      }
  }

 openCase=()=>{
        this.buttonHover = false

        setTimeout(()=>{
          this.animationFinished()
        },500)

        this.case.style.transition = "transform 0.5s";
        this.wrapper.classList.remove(styles.buttonHover);
        this.active = true
        this.wrapper.classList.add(styles.active);
        document.documentElement.style.overflow = "hidden"
        var rect = this.wrapper.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollTo = rect.top + scrollTop
        window.scroll({left:0, top: scrollTo,  behavior: 'smooth' });
        this.case.style.webkitTransform = "none";
        this.case.style.transform = "none";

        //escape button handling
        document.onkeydown = (evt) => {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
              isEscape = (evt.key == "Escape" || evt.key == "Esc");
          } else {
              isEscape = (evt.keyCode == 27);
          }
          if (isEscape && this.active) {
            this.handleClose()
          }
        };
  }

  animationFinished=()=>{
      this.wrapper.classList.add(styles.finished);
      this.setState({animationFinished:true})
      this.wrapper.style.backgroundColor = this.primaryColor
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
    const scrollTo = rect.top + scrollTop - 60 
    window.scroll({left:0, top: scrollTo,  behavior: 'smooth' });
    this.case.style.webkitTransform = this.initialTransform;
    this.case.style.transform = this.initialTransform;

    setTimeout(()=>{
      this.setState({animationFinished:false})
      this.case.style.transition = "transform 0.2s";
    },500)

    document.onkeydown = null
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
      this.buttonHover = true
      this.wrapper.classList.add(styles.buttonHover);

      const transformation = this.case.style.transform + `
   
      `
      this.case.style.webkitTransform = transformation;
      this.case.style.transform = transformation;

  }
  buttonNoHover = () =>{
     this.buttonHover = false
     this.wrapper.classList.remove(styles.buttonHover);
  }

  resetTransform = () => {
    setTimeout(()=>{
      if(!this.active){
        this.case.style.webkitTransform = this.initialTransform
        this.case.style.transform = this.initialTransform
      }
     
    }, 500)
  }

  hoverNavigation=(enter)=>{
    // if(enter){
    //   this.infoBox.style.opacity = 0
    //   this.infoBox.style.transform = 'translate3d(0%, -50%, 300px) rotate3d(1, 1, 0, -15deg) '
    //   this.infoBox.style.webkitTransform = 'translate3d(0%, -50%, 300px) rotate3d(1, 1, 0, -15deg) '
    // }else{
    //   this.infoBox.style.opacity = 1
    //   this.infoBox.style.transform = 'translate3d(0%, -50%, 300px)'
    //   this.infoBox.style.webkitTransform = 'translate3d(0%, -50%, 300px)'
    // }
  }

  applyImageTransformation=(img, translate, frontImg)=>{
    if(frontImg){
      img.style.opacity = 0
      img.style.transform = img.style.transform + ` translateY(50px)`
      img.style.webkitTransform = img.style.webkitTransform + ` translateY(50px)`
      setTimeout(()=>{
        img.style.opacity = 1
      },300)
    }
    setTimeout(()=>{
      img.style.transform = `translate3d(0, -18%, ${translate}px) scale(1)`
      img.style.webkitTransform = `translate3d(0, -18%, ${translate}px) scale(1)`
      img.style.zIndex = translate
    },300)
  }

  transformImages=(next, previous)=>{
    var transform = 80
    const imageCount = this.images.length
    this.images.forEach((img,idx)=>{
      const frontImg = next ? idx === 0 : idx === imageCount-1
      img && this.applyImageTransformation(img, transform, frontImg)
      transform += 80
    })
  }

  nextImage = () =>{
    //Shift the array around
    this.images.unshift(this.images.pop())
    this.transformImages(true, false)
  }

  previousImage = () =>{
    //Shift the array around
    this.images.push(this.images.shift())
    this.transformImages(false, true)
  }

  case = null
  close = null
  wrapper = null
  bg = null

  render() {

    this.images = []
    var translate = 0
    const skillsCount = this.props.case.skills.length
    const categoriesCount = this.props.case.categories.length

    return (
      <div 
      ref={wrapper=>{
          if(wrapper){
            this.wrapper = wrapper
            wrapper.onmouseleave = this.resetTransform
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
        style={{fill:this.primaryColor}}
        className={styles.navigation}>
          <div  className="container">
            <Arrow
              onMouseOut={()=>this.hoverNavigation(false)}
              onMouseOver={()=>this.hoverNavigation(true)}
              onClick={this.nextImage}
              className={styles.next} height={60} width={50} />
            <Arrow 
              onMouseOut={()=>this.hoverNavigation(false)}
              onMouseOver={()=>this.hoverNavigation(true)}
              onClick={this.previousImage}
              className={styles.previous} height={60} width={50} />
          </div>
        </div>
         
         
         <div 
          ref={(ref)=>this.infoBox=ref}
          className={styles.info}>
          <div 
            style={{
              backgroundColor: this.primaryColor}}
            className={styles.bg} />
          <h3
          style={{
              color:this.secondaryColor}}
          >
           <EditableText 
            {...this.props}
            content={this.props.case.title}
            entityID={this.props.case._id}
            entityField="title"
            />
          </h3>

          <h4>
            <EditableText 
            {...this.props}
            content={this.props.case.subtitle}
            entityID={this.props.case._id}
            entityField="subtitle"
            />
          </h4>

          
          
          
          <EditableText 
            {...this.props}
            content={this.props.case.content.brief}
            entityID={this.props.case._id}
            entityField="content.brief"
          />


          <Button
          onMouseOut={this.buttonNoHover}
          onMouseOver={this.buttonHover}
          mainColor={this.secondaryColor}
          hoverTextColor={this.primaryColor}
          onClick={(event)=>{

              this.handleMouseMove({setActive:true}, this.case)
            
            }}
          >
            READ MORE
          </Button>

          {this.props.case.link ?
            <Button
            target="blank"
            className="button-look"
            href={this.props.case.link}
            onMouseOut={this.buttonNoHover}
            onMouseOver={this.buttonHover}
            mainColor={this.secondaryColor}
            hoverTextColor={this.primaryColor}
            style={{marginLeft: "10px"}}
    
          >
            VISIT
          </Button>
           : null}
        </div>
        
      <Grid className="container" fluid>
        <section
        ref={theCase=>{
          this.case = theCase
          if(theCase){ 
            theCase.style.transform = this.initialTransform
            theCase.style.webkitTransform = this.initialTransform
          }
          }}
        className={styles.case}
        >
        <div 
       
        className={styles.bg} >
            <div 
            style={{backgroundColor: this.primaryColor}}></div>
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
            translate =  translate + 80 
            return  <div 
                      ref={i=>i && this.images.push(i)}
                      key={img._id}
                      style={{transform: `translate3d(0, -18%, ${translate}px) scale(1)` }}
                      className={styles.imgWrapper}>
                      <Image src={img.secure_url} alt=""/> 
                    </div>
          })
        }
        </div>

        {
          this.state.animationFinished ? 
          (this.props.case.content.extended ?
            <EditableText 
            {...this.props}
            className={styles.extendedContent}
            content={this.props.case.content.extended}
            entityID={this.props.case._id}
            entityField="content.extended"
          />
           : 
           <div
           className={styles.extendedContent}
           >
           <PandaPlaceholder />
           </div>
            )
   
          :
          null
        }
      </section>
      </Grid>
    
      </div>
    );
  }
})


export default editor(Case, '/api/cases')

