import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case';
import CaseExtended from '../Case';
import styles from './index.module.css';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms';
import { connect } from 'react-redux';
import * as a from './actions';
import  {ScrollAnimator} from 'cude-animations';
import Button from '../../components/Button/index';

class CaseOverview extends React.Component {

  scrollContainer = null
  state = {
    caseClosed:true,
    factOne: ['',''],
    factTwo: ['',''],
    factThree: ['','']
  }
  keyframesPushed = false
  keyframes = []

  componentDidMount(){
    setTimeout(()=> {
      const offset = (this.scrollContainer.offsetTop - window.innerHeight)
      const animator = new ScrollAnimator(
        this.scrollContainer,
        this.keyframes,
        offset
      ).start()
    }, (process.env.NODE_ENV === "development" ? 2000 : 0));

  }


  componentWillReceiveProps(nextProps){
    if(!nextProps.openCase){
      this.setState({caseClosed:true})
    }else{
      this.setState({
        caseClosed:false,
        openCase: nextProps.openCase
      })
    }
  }

  setCaseInfo = (theCase) =>{

      this.setState({
        type: theCase.type,
        factOne: theCase.factOne.split(":"),
        factTwo: theCase.factTwo.split(":"),
        factThree: theCase.factThree.split(":")
      })
  }

  renderCases = () => {
    this.keyframes = []
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>{
        if(!this.props.selectedCases.includes(theCase._id)){
          return null
        }
         return( <section
          key={theCase._id}
          className="case"
          ref={sec=>{
              if(sec){
                if(ndx === 0){
                  pushFirstKeyframe(sec, theCase._id, this.keyframes)
                  if(!this.state.type){
                    this.setCaseInfo(theCase)
                  }
                }else{
                  pushRevealKeyframe(sec, theCase._id, this.keyframes, ()=>this.setCaseInfo(theCase))
                }
                if(ndx+1 === this.props.data.length){

                  pushLastKeyframe(sec, theCase._id, this.keyframes, ()=>{
                    this.setCaseInfo(theCase)})

                }else{
                  pushHideKeyframe(sec, theCase._id, this.keyframes, ()=>this.setCaseInfo(theCase))
                }
              }
              }
            }
          >

            <Case
            id={theCase._id}
            case={theCase} />
          </section>
          )}
   );
  }

  render() {
    return (
      <section
      id="case-overview"
     >


        <h2 className={styles.header}>
            Selected Projects
        </h2>

        <div
        ref={con=>{
          this.scrollContainer = con
        }}
        className={styles.casesContainer}>

              <div id="case-frame">
                <Grid fluid className="container">
                <Row middle="xs">
                  <Col xs={12} >
                  <div id="frame">
                    <div id="case-type">
                      <h4>
                        {this.state.type}
                      </h4>
                    </div>
                    <div id="case-facts">
                      <h4>
                      {this.state.factOne[0]}
                        <span>
                          {this.state.factOne[1]}
                        </span>
                      </h4>
                      <h4>
                        {this.state.factTwo[0]}
                        <span>
                        {this.state.factTwo[1]}
                        </span>
                      </h4>
                      <h4>
                        {this.state.factThree[0]}
                        <span>
                        {this.state.factThree[1]}
                        </span>
                      </h4>
                    </div>

                  </div>
                  </Col>
                </Row>
                </Grid>
              </div>

       { this.renderCases()}

        </div>

        </section>
    );
  }
}

const mapStateToProps = (state) => {
      return { openCase: state.openCase }
}


CaseOverview = connect(mapStateToProps)(CaseOverview)


export default fetcher(CaseOverview, '/api/cases')




const pushFirstKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
  const caseFrame = document.querySelector('#case-frame');
  const caseType = document.querySelector('#case-type');
  const caseFacts = document.querySelector('#case-facts');

  //Mobile
  if(window.innerWidth <= 768){
    keyframes.push({
      'wrapper' : wrapper,
      "keyframeStarted": keyframeStarted,
      'duration' : '100%',
      'animations' :  [
            {
              manipulator : (val)=>{
  
                if(val >= 1000){
                  caseFrame.style.position = 'fixed';
                  wrapper.style.position = 'fixed';
                }else{
                  caseFrame.style.position = 'absolute';
                  wrapper.style.position = 'relative';
                }
              },
              'valueRange' : [0,1000] //large range gives better precision
            },
        {
          'selector'    : '#case-image-'+id+'-1',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-2',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-3',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
         {
          manipulator : (val)=>{
            caseType.style.transform = `translate(-50%, -50%) scaleX(${val})`;
          },
          'valueRange' : [0,1]
        },
         {
          'selector'    : '#case-type h4',
          'translateY'     : ["40%", "0%"]
        },
         {
          manipulator : (val)=>{
            caseFacts.style.transform = `translate(-50%, 50%) scaleX(${val})`;
          },
          'valueRange' : [0,1]
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
      'wrapper' : wrapper,
      "keyframeStarted": keyframeStarted,
      'duration' : '100%',
      'animations' :  [
        {
          'selector'    : '#case-text-'+id,
          'translateY'  : ['50%', '0%'],
          'opacity'     : [0, 1]
        },
      ]
    })
  //Desktop
  }else{
    keyframes.push({
      'wrapper' : wrapper,
      "keyframeStarted": keyframeStarted,
      'duration' : '100%',
      'animations' :  [
            {
              manipulator : (val)=>{
  
                if(val >= 1000){
                  caseFrame.style.position = 'fixed';
                  wrapper.style.position = 'fixed';
                }else{
                  caseFrame.style.position = 'absolute';
                  wrapper.style.position = 'relative';
                }
              },
              'valueRange' : [0,1000] //large range gives better precision
            },
        {
          'selector'    : '#case-text-'+id,
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-1',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-2',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-3',
          'easing'      : 'linear',
          'opacity'     : [0, 1]
        },
         {
          manipulator : (val)=>{
            caseType.style.transform = `translate(-50%, -50%) scaleX(${val})`;
          },
          'valueRange' : [0,1]
        },
         {
          'selector'    : '#case-type h4',
          'translateY'     : ["40%", "0%"]
        },
         {
          manipulator : (val)=>{
            caseFacts.style.transform = `translate(-50%, 50%) scaleX(${val})`;
          },
          'valueRange' : [0,1]
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
  }

 
}

const pushRevealKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
  if(window.innerWidth <= 768){


    keyframes.push({
      'wrapper' : wrapper,
      "keyframeStarted": keyframeStarted,
      'duration' : '100%',
      'animations' :  [
        {
          'selector'    : '#case-image-'+id+'-1',
          'translateY'  : ['30%', '0%'],
  
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-2',
          'translateY'  : ['40%', '0%'],
  
          'opacity'     : [0, 1]
        },
        {
          'selector'    : '#case-image-'+id+'-3',
          'translateY'  : ['50%', '0%'],
  
          'opacity'     : [0, 1]
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
        {
          'selector'    : '#frame',
          'translateY'  : ['0%', '-0%'] // hack for centering frame when scrolling from below
        },
      ]
    })


  keyframes.push({
    'wrapper' : wrapper,
    "keyframeStarted": keyframeStarted,
    'duration' : '100%',
    'animations' :  [
      {
        'selector'    : '#case-text-'+id,
        'translateY'  : ['50%', '0%'],
        'opacity'     : [0, 1]
      },
      {
        'selector'    : '#frame',
        'translateY'  : ['0%', '-0%'] // hack for centering frame when scrolling from below
      },
    ]
  })
    //Desktop
  }else{
  keyframes.push({
    'wrapper' : wrapper,
    "keyframeStarted": keyframeStarted,
    'duration' : '100%',
    'animations' :  [
      {
        'selector'    : '#case-text-'+id,
        'translateY'  : ['50%', '0%'],
        'opacity'     : [0, 1]
      },
      {
        'selector'    : '#case-image-'+id+'-1',
        'translateY'  : ['30%', '0%'],

        'opacity'     : [0, 1]
      },
      {
        'selector'    : '#case-image-'+id+'-2',
        'translateY'  : ['40%', '0%'],

        'opacity'     : [0, 1]
      },
      {
        'selector'    : '#case-image-'+id+'-3',
        'translateY'  : ['50%', '0%'],

        'opacity'     : [0, 1]
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
      {
        'selector'    : '#frame',
        'translateY'  : ['0%', '-0%'] // hack for centering frame when scrolling from below
      },
    ]
  })
  }
}


const pushHideKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
    keyframes.push({
      'wrapper' : wrapper,
      "keyframeStarted": keyframeStarted,
      'duration' : '100%',
      'animations' :  [
         {
          'selector'    : '#case-type h4',
          'translateY'     : ["0%", "-50%"]
        },
        {
          'selector'    : '#scroll-indicator',
          'easing'     : 'linear',
          'translateY'     : ["8%", "16%"]
        },
        {
          'selector'    : '#case-text-'+id,
          'translateY'  : ['0%','-25%'] ,
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
          'selector'    : '#case-image-'+id+'-1',
          'translateY'  : ['0%', '-40%'],
          'opacity'     : [1, 0]
        },
        {
          'selector'    : '#case-image-'+id+'-2',
          'translateY'  : ['0%', '-30%'],
          'opacity'     : [1, 0]
        },
        {
          'selector'    : '#case-image-'+id+'-3',
          'translateY'  : ['0%', '-20%'],
          'opacity'     : [1, 0]
        },
        {
          'selector'    : '#frame',
          'translateY'  : ['0%', '-0%'] // hack for centering frame when scrolling from below
        },
      ]
    })
}

const pushLastKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
  const caseFacts = document.querySelector('#case-facts');

  keyframes.push({
    'wrapper' : wrapper,
    "keyframeStarted": keyframeStarted,
    'duration' : '100%',
    'animations' :  [

        {
        'selector'    : '#frame',
        'translateY'  : ['0%', '-100%'],
        'easing'      : 'linear',
        'opacity'     : [1, 1]
      },

      {
        'selector'    : '#case-text-'+id,
        'translateY'  : ['0%', '-100%'],
        'easing'      : 'linear',
        'opacity'     : [1,0]
      },
      {
        'selector'    : '#case-image-'+id+'-1',
        'translateY'  : ['0%', '-100%'],
        'easing'      : 'linear',
        'opacity'     : [1,0]
      },
      {
        'selector'    : '#case-image-'+id+'-2',
        'translateY'  : ['0%', '-100%'],
        'easing'      : 'linear',
        'opacity'     : [1,0]
      },
      {
        'selector'    : '#case-image-'+id+'-3',
        'translateY'  : ['0%', '-100%'],
        'easing'      : 'linear',
        'opacity'     : [1,0]
      },
       {
        manipulator : (val)=>{
          caseFacts.style.transform = `translate(-50%, 50%) scaleX(${val})`;
        },
        'valueRange' : [1,0]
      },
       {
        'selector'    : '#case-facts h4:nth-child(1)',
        'translateY'     : ["0%", "40%"]
      },
      {
        'selector'    : '#case-facts h4:nth-child(2)',
        'translateY'     :["0%", "40%"]
      },
      {
        'selector'    : '#case-facts h4:nth-child(3)',
        'translateY'     : ["0%", "40%"]
      },
    ]
  })
}
