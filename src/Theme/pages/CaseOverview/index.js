import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case'
import CaseExtended from '../Case'
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms'
import { connect } from 'react-redux';
import * as a from './actions'
import { init, keyframes } from 'cude-animations'
import Button from '../../components/Button/index'

class CaseOverview extends React.Component {
 
  scrollContainer = null
  state = {caseClosed:true}

  componentDidMount(){
    init(this.scrollContainer, 500)
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
        agency: theCase.agency,
        year: theCase.year,
        role: theCase.role
      })
  }

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>{
         return( <section 
          key={theCase._id}
          className="case"
          ref={sec=>{
              if(ndx === 0){
                pushFirstKeyframe(sec, theCase._id)
                if(!this.state.type){
                  this.setCaseInfo(theCase)
                }
              }else{
                pushRevealKeyframe(sec, theCase._id, ()=>this.setCaseInfo(theCase))
              }
                pushHideKeyframe(sec, theCase._id, ()=>this.setCaseInfo(theCase))
              }}
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
          Work
        </h2>
        
        <div 
        ref={con=>{
          this.scrollContainer = con
        }}
        className={styles.casesContainer}>
            
              <section id="case-frame">
                <Grid fluid className="container">
                <Row>
                  <Col xs={12} >
                  <div id="frame">
                    <div id="case-type">
                      <h4>
                        {this.state.type}
                      </h4>
                    </div>
                    <div id="case-facts">
                      <h4>
                        Design
                        <span>
                          {this.state.agency}
                        </span>
                      </h4>
                      <h4>
                        Role
                        <span>
                        {this.state.role}
                        </span>
                      </h4>
                      <h4>
                        Year
                        <span>
                        {this.state.year}
                        </span>
                      </h4>
                    </div>
                    <div id="frame-scroller">
                      <div id="scroll-indicator"></div>
                      <div className="case-indexes">
                        {this.props.data.map((el, idx)=>{
                          return <span>{idx+1}</span>
                        })}
                      </div>
                    </div>
                  </div>
                  </Col>
                </Row>
                </Grid>
              </section>
            
       { this.renderCases()}

        </div>
      {
        this.state.openCase ?
        <CaseExtended 
          hide={this.state.caseClosed}
          case={this.state.openCase}
        />
        : 
        null
      }
        

        </section>
    );
  }
}

const mapStateToProps = (state) => {  
      return { openCase: state.openCase }
}


CaseOverview = connect(mapStateToProps)(CaseOverview)


export default fetcher(CaseOverview, '/api/cases')




const pushFirstKeyframe = (wrapper, id, keyframeStarted) => {
  keyframes.push({
    'wrapper' : wrapper,
    "keyframeStarted": keyframeStarted,
    'duration' : '100%',
    'animations' :  [

        {
        'selector'    : '#frame',
        'translateY'  : ['100%', '0%'],
        'easing'      : 'linear',
        'opacity'     : [1, 1] 
      },
  
      {
        'selector'    : '#case-text-'+id,
        'translateY'  : ['80%', '0%'],
        'easing'      : 'linear',
        
        'opacity'     : [-1, 1] 
      },
      {
        'selector'    : '#case-image-'+id+'-1',
        'translateY'  : ['30%', '0%'],
        'easing'      : 'linear',
        'opacity'     : [-1, 1] 
      },
      {
        'selector'    : '#case-image-'+id+'-2',
        'translateY'  : ['40%', '0%'],
        'easing'      : 'linear',
        'opacity'     : [-1, 1] 
      },
      {
        'selector'    : '#case-image-'+id+'-3',
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
}

const pushRevealKeyframe = (wrapper, id, keyframeStarted) => {
  keyframes.push({
    'wrapper' : wrapper,
    'duration' : '100%',
    "keyframeStarted": keyframeStarted,
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
    ]
  })
}


const pushHideKeyframe = (wrapper, id, keyframeStarted) => {
  keyframes.push({
    'wrapper' : wrapper,
    'duration' : '100%',
    "keyframeStarted": keyframeStarted,
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
      }
    ]
  })
}
