import React from 'react';
import {
  LoadingImage, 
  editor, 
  EditableText, 
  PandaPlaceholder,
  helperFunctions,
  Icons
} from 'cude-cms';
import { connect } from 'react-redux';
import Button from '../../components/Button/index'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import * as a from './actions'
import { animate } from '../../assets/js/cudeAnimation'

let {Cross, Arrow, ...IconsRest} = Icons

class Case extends React.Component {
  
  background = null

  componentWillMount(){
    var rgb = {r:255,g:255,b:255}

    if(this.props.case.primaryColor){
      if (this.props.case.primaryColor.indexOf("#" !== -1)){
        rgb = helperFunctions.hexToRgb(this.props.case.primaryColor)
      }else{
        var hex = helperFunctions.rgbToHex(this.props.case.primaryColor)
        rgb = helperFunctions.hexToRgb(hex)
      }
    } 
    this.primaryColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
    this.primaryColorAlpha = `rgba(${rgb.r},${rgb.g},${rgb.b},0.7)`

    if(this.props.case.secondaryColor){
      if (this.props.case.secondaryColor.indexOf("#" !== -1)){
        rgb = helperFunctions.hexToRgb(this.props.case.secondaryColor)
      }else{
        var hex = helperFunctions.rgbToHex(this.props.case.secondaryColor)
        rgb = helperFunctions.hexToRgb(hex)
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

    document.documentElement.style.overflow = "hidden"
    this.wrapper.classList.add(styles.caseOpen)
    this.background.style.transition = "transform 250ms cubic-bezier(0.77, 0, 0.175, 1)"
    this.props.caseOpened(this.props.case)

    //escape button handling
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
          isEscape = (evt.key == "Escape" || evt.key == "Esc");
      } else {
          isEscape = (evt.keyCode == 27);
      }
      if (isEscape) {
        this.closeCase()
      }
    };
  }

  animationFinished=()=>{
      this.wrapper.classList.add(styles.finished);
      this.setState({animationFinished:true})
     // this.wrapper.style.backgroundColor = this.primaryColor
      this.case.style.webkitTransform = "none";
      this.case.style.transform = "none";
  }

  closeCase=()=>{
    document.documentElement.style.overflow = ""
    this.wrapper.classList.remove(styles.caseOpen)
    document.onkeydown = null
    this.props.caseClosed()
  }

  handleClose = ()=>{
    if (this.wrapper.scrollTop === 0){
      this.closeCase()
    }else{
      var debouncedClosing = helperFunctions.debounce(()=> {
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
      className={styles.wrapper}
      ref={ref=>this.wrapper=ref}
      >
         
      <Grid className="container" fluid>
              <Row middle="xs">
                <Col sm={5} smOffset={1}  >
                   <div ref={close=>this.close = close}>
          <Cross
            onClick={()=>this.handleClose()}
            className={styles.closeButton}
           />
       
        </div>
         
  
          <div 
          id={'case-text-'+this.props.case._id}
          ref={(ref)=>this.infoBox=ref}
          >
  
          <h3
          style={{
              color:this.primaryColor}}
          >
           <EditableText 
            {...this.props}
            content={this.props.case.title}
            entityID={this.props.case._id}
            entityField="title"
            />
          </h3>

  
          <EditableText 
            {...this.props}
            content={this.props.case.content.brief}
            entityID={this.props.case._id}
            entityField="content.brief"
          />


          <Button
          onMouseOut={this.buttonNoHover}
          onMouseOver={this.buttonHover}
          mainColor={this.primaryColor}
          hoverTextColor={this.secondaryColor}
          onClick={(event)=>{ this.openCase() }}
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
            mainColor={this.primaryColor}
            hoverTextColor={this.secondaryColor}
            style={{marginLeft: "10px"}}
    
          >
            VISIT
          </Button>
           : null}

        </div>
        
                </Col>
                <Col
                  sm={5} 
                >
                   <div id="case-images">
                     {
                    this.props.case.images.map((img,idx)=>{
                        
                        return ( 
                          <LoadingImage 
                          ref={i=>i && this.images.push(i)}
                          id={"case-image-"+this.props.case._id+'-'+(idx+1)}
                          src={img.secure_url} alt=""/> 
                      )
                      })
                    }
                  </div> 
                </Col>
              </Row>



       
      </Grid>
      {/* <section
        ref={theCase=>{
          this.case = theCase
          if(theCase){ 
            theCase.style.transform = this.initialTransform
            theCase.style.webkitTransform = this.initialTransform
          }
          }}
        className={styles.extendedCase}
        >
        <Grid className="container" fluid>
              <Row>
                <Col xs={12} sm={12} >
                <h1 
                style={{color:this.secondaryColor}}
              >
           {this.props.case.title}
         </h1>
          
          <div className={styles.reader}>

         <Row>
                <Col sm={8} smOffset={2} >
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
               </Col>
              </Row>
              </div>
                </Col>
              </Row>
          </Grid>

        
      </section> */}
      <div 
        ref={r=>this.background=r}
        className={styles.background} 
        style={{backgroundColor: this.primaryColor}} />
      
      </div>

    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    caseOpened: (theCase) => dispatch(a.caseOpened(theCase)),
    caseClosed: () => dispatch(a.caseClosed())
  }
}

const SmartCase = connect(state=>state, mapDispatchToProps)(Case)

export default editor(SmartCase, '/api/cases')

