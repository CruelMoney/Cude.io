import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case'
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms'
import { connect } from 'react-redux';
import * as a from './actions'
import {init, keyframes} from './scrollAnimation'
import Button from '../../components/Button/index'

var endReached = false

class CaseOverview extends React.Component {

  scrollContainer = null

  componentDidMount(){
    init(this.scrollContainer)
  }

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
          
          <div 
          key={theCase._id}
          className={styles.caseItem}>
       
            <Case 
            case={theCase}
            fullyEnterViewport={() => {
              this.props.pushCaseInfo(theCase)
            }}
             />
          </div>
          
   );
  }

  render() {


    return (
      <section 
      id="case-overview"
     >  
     
        
        <h2 className={styles.header}>
          Work
        </h2>
        
        <div 
        ref={con=>{
          this.scrollContainer = con
        }}
        className={styles.casesContainer}>
            
              <section id="case-frame"
             
              >
                <Grid fluid className="container">
                <Row>
                  <Col xs={12} >
                  <div id="frame">
                    <div id="case-type">
                      <h4>
                        Website
                      </h4>
                    </div>
                    <div id="case-facts">
                      <h4>
                        Design
                        <span>
                          Oskar Hanak
                        </span>
                      </h4>
                      <h4>
                        Role
                        <span>
                          Developer
                        </span>
                      </h4>
                      <h4>
                        Year
                        <span>
                          2017
                        </span>
                      </h4>
                    </div>
                  </div>
                  </Col>
                </Row>
                </Grid>
              </section>
            
            <section 
            ref={sec=>{
              
              keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [

                    {
                    'selector'    : '#frame',
                    'translateY'  : ['100%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [1, 1] 
                  },
              
                  {
                    'selector'    : '#case-text',
                    'translateY'  : ['80%', '0%'],
                    'easing'      : 'linear',
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-1',
                    'translateY'  : ['30%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-2',
                    'translateY'  : ['40%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-3',
                    'translateY'  : ['50%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  },
                   {
                    'selector'    : '#case-type',
                    'scale'     : [0, 1] 
                  },
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["40%", "0%"] 
                  },
                   {
                    'selector'    : '#case-facts',
                    'scale'     : [0, 1]
                   
                  },
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    'delay'       : "10%",
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    'delay'       : "20%",
                    'translateY'     : ["40%", "0%"] 
                  },
                ]
              })
        
         

               keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["0%", "-50%"] 
                  },
                  {
                    'selector'    : '#case-text',
                    'translateY'  : ['0%','-80%'] ,
                    'opacity'     : [1, 0] 
                  },
        
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    //'delay'       : "30%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    //'delay'       : "60%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-image-1',
                    'translateY'  : ['0%', '-10%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-2',
                    'translateY'  : ['0%', '-20%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-3',
                    'translateY'  : ['0%', '-30%'],
                    'opacity'     : [1, 0] 
                  }
                ]
              })

            }}
            id="case" className={styles.wrapper}>
            <Grid fluid className="container">
              <Row middle="xs">
                <Col sm={5} smOffset={1}  >
                  <div id="case-text">
                    <h3 style={{color:"#F9CD45"}}>
                    California Kitchen
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  <Button
                  
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    READ MORE
                  </Button>
                   <Button
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    VISIT
                  </Button>
                  </div>
                </Col>
                <Col
                  sm={5}
                  smOffset={1}
                >
                  <div id="case-images">
                    <img id="case-image-1" src="" alt=""/>
                    <img id="case-image-2" src="" alt=""/>
                    <img id="case-image-3" src="" alt=""/>
                  </div>
                </Col>
              </Row>
             </Grid>
            </section>
            
            



            <section 
            ref={sec=>{
              
              keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [

                    
                  {
                    'selector'    : '#case-text-1',
                    'translateY'  : ['80%', '0%'],
                    
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-1-1',
                    'translateY'  : ['30%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-1-2',
                    'translateY'  : ['40%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-1-3',
                    'translateY'  : ['50%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
      
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["40%", "0%"] 
                  },
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    'delay'       : "10%",
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    'delay'       : "20%",
                    'translateY'     : ["40%", "0%"] 
                  },
                ]
              })
        
         

               keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["0%", "-50%"] 
                  },
                  {
                    'selector'    : '#case-text-1',
                    'translateY'  : ['0%','-80%'] ,
                    'opacity'     : [1, 0] 
                  },
        
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    //'delay'       : "30%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    //'delay'       : "60%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-image-1-1',
                    'translateY'  : ['0%', '-10%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-1-2',
                    'translateY'  : ['0%', '-20%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-1-3',
                    'translateY'  : ['0%', '-30%'],
                    'opacity'     : [1, 0] 
                  }
                ]
              })

            }}
            id="case" className={styles.wrapper}>
            <Grid fluid className="container">
              <Row middle="xs">
                <Col sm={5} smOffset={1}  >
                  <div id="case-text-1">
                    <h3 style={{color:"#F9CD45"}}>
                    California Kitchen
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  <Button
                  
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    READ MORE
                  </Button>
                   <Button
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    VISIT
                  </Button>
                  </div>
                </Col>
                <Col
                  sm={5}
                  smOffset={1}
                >
                  <div id="case-images">
                    <img id="case-image-1-1" src="" alt=""/>
                    <img id="case-image-1-2" src="" alt=""/>
                    <img id="case-image-1-3" src="" alt=""/>
                  </div>
                </Col>
              </Row>
             </Grid>
            </section>


            <section 
            ref={sec=>{
              
              keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [

                    
                  {
                    'selector'    : '#case-text-2',
                    'translateY'  : ['80%', '0%'],
                    
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-2-1',
                    'translateY'  : ['30%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-2-2',
                    'translateY'  : ['40%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-2-3',
                    'translateY'  : ['50%', '0%'],
                    
                    'opacity'     : [-1, 1] 
                  },
      
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["40%", "0%"] 
                  },
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    'delay'       : "10%",
                    'translateY'     : ["40%", "0%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    'delay'       : "20%",
                    'translateY'     : ["40%", "0%"] 
                  },
                ]
              })
        
         

               keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                   {
                    'selector'    : '#case-type h4',
                    'translateY'     : ["0%", "-50%"] 
                  },
                  {
                    'selector'    : '#case-text-2',
                    'translateY'  : ['0%','-80%'] ,
                    'opacity'     : [1, 0] 
                  },
        
                   {
                    'selector'    : '#case-facts h4:nth-child(1)',
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(2)',
                    //'delay'       : "30%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-facts h4:nth-child(3)',
                    //'delay'       : "60%",
                    'translateY'     : ["0%", "-40%"] 
                  },
                  {
                    'selector'    : '#case-image-2-1',
                    'translateY'  : ['0%', '-10%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-2-2',
                    'translateY'  : ['0%', '-20%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-2-3',
                    'translateY'  : ['0%', '-30%'],
                    'opacity'     : [1, 0] 
                  }
                ]
              })

            }}
            id="case" className={styles.wrapper}>
            <Grid fluid className="container">
              <Row middle="xs">
                <Col sm={5} smOffset={1}  >
                  <div id="case-text-2">
                    <h3 style={{color:"#F9CD45"}}>
                    California Kitchen
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  <Button
                  
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    READ MORE
                  </Button>
                   <Button
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    VISIT
                  </Button>
                  </div>
                </Col>
                <Col
                  sm={5}
                  smOffset={1}
                >
                  <div id="case-images">
                    <img id="case-image-2-1" src="" alt=""/>
                    <img id="case-image-2-2" src="" alt=""/>
                    <img id="case-image-2-3" src="" alt=""/>
                  </div>
                </Col>
              </Row>
             </Grid>
            </section>
        

        </div>
        </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {  
      return { pushCaseInfo: (theCase) => dispatch(a.pushCaseInfo(theCase)) }
}


CaseOverview = connect(state=>state, mapDispatchToProps)(CaseOverview)


export default fetcher(CaseOverview, '/api/cases')



