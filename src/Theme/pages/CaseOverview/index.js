import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case'
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms'
import { connect } from 'react-redux';
import * as a from './actions'
import {init, keyframes} from './scrollAnimation'

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
      ref={(ref)=>this.section = ref}>
        {/* <Grid fluid className="container">
        <h2 
        className={styles.header + " center"} >
        <DBText dbKey="case-overview-header"/>
        </h2>
        </Grid> */}

        <div 
        ref={con=>{
          this.scrollContainer = con
        }}
        className="container">
            <div className="background"></div>
            <section 
            ref={sec=>{
              keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                  {
                    'selector'    : '.name',
                    //'translateY'  : '-25%',
                    'opacity'     : [0, 1] 
                  } , {
                    'selector'    : '.byline',
                    //'translateY'  : '-25%',
                    'opacity'     : [0, 1] 
                  } 
                ]
              })
               keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                  {
                    'selector'    : '.name',
                    'translateY'  : '-100%' ,
                    'opacity'     : [1, 0] 
                  } , {
                    'selector'    : '.byline',
                    'translateY'  :  '-100%' ,
                    'opacity'     : [1, 0] 
                  } 
                ]
              })
            }}
            id="intro" className={styles.wrapper}>
              <h1 className="name">Parallax Demo</h1>
              <h2 className="byline">An experiment by Dave Gamache</h2>
            </section>
            <section id={styles.explosion} className={styles.wrapper}
              ref={ref=>{
                keyframes.push(
                  {
                  'wrapper' : ref,
                  'duration' : '150%',
                  'animations' :  [
                    {
                      'selector'    : '.explosion-byline',
                      'translateY'  : '-25%',
                      'opacity'     : [0, 1.75] // hack to accelrate opacity speed
                    } , {
                      'selector'    : '#domExplosionList',
                      'translateY'  : '-70%',
                      'opacity'     : [0, 1] // hack to accelrate opacity speed
                    }
                  ]
                } )
                keyframes.push( {
                  'wrapper' : ref,
                  'duration' : '150%',
                  'animations' :  [
                    {
                      'selector'    : '.dei-1',
                      'translateY'  : '-15%',
                      'translateX'  : '-10%',
                      'opacity'     : [1, 0],
                      'scale'       : 2,
                    } , {
                      'selector'    : '.dei-2',
                      'translateY'  : '-5%',
                      'translateX'  : '-4%',
                      'opacity'     : [1, 0] // hack to decelrate opacity speed
                    } , {
                      'selector'    : '.dei-3',
                      'translateY'  : '-9%',
                      'translateX'  : '2%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.2,
                    } , {
                      'selector'    : '.dei-4',
                      'translateY'  : '-17%',
                      'translateX'  : '8%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.5,
                    } , {
                      'selector'    : '.dei-5',
                      'translateY'  : '-2%',
                      'translateX'  : '-15%',
                      'opacity'     : [1, 0],
                      'scale'       : 2,
                    } , {
                      'selector'    : '.dei-6',
                      'translateY'  : '-1%',
                      'translateX'  : '-7%',
                      'opacity'     : [1, 0], // hack to decelrate opacity speed
                      'scale'       : 1.2,
                    } , {
                      'selector'    : '.dei-7',
                      'translateY'  : '-4%',
                      'translateX'  : '2%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.1,
                    } , {
                      'selector'    : '.dei-8',
                      'translateY'  : '-3%',
                      'translateX'  : '12%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.8,
                    } , {
                      'selector'    : '.dei-9',
                      'translateY'  : '3%',
                      'translateX'  : '-12%',
                      'opacity'     : [1, 0],
                      'scale'       : 1.5,
                    } , {
                      'selector'    : '.dei-10',
                      'translateY'  : '5%',
                      'translateX'  : '-4%',
                      'opacity'     : [1, 0] // hack to decelrate opacity speed
                    } , {
                      'selector'    : '.dei-11',
                      'translateY'  : '8%',
                      'translateX'  : '6%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.4,
                    } , {
                      'selector'    : '.dei-12',
                      'translateY'  : '1%',
                      'translateX'  : '20%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.9,
                    } , {
                      'selector'    : '.dei-13',
                      'translateY'  : '8%',
                      'translateX'  : '-12%',
                      'opacity'     : [1, 0],
                      'scale'       : 1.8,
                    } , {
                      'selector'    : '.dei-14',
                      'translateY'  : '4%',
                      'translateX'  : '-3%',
                      'opacity'     : [1, 0], // hack to decelrate opacity speed
                      'scale'       : 1.3,
                    } , {
                      'selector'    : '.dei-15',
                      'translateY'  : '14%',
                      'translateX'  : '5%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.7,
                    } , {
                      'selector'    : '.dei-16',
                      'translateY'  : '6%',
                      'translateX'  : '9%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 2,
                    }
                  ]
                } )
                keyframes.push( {
                  'wrapper' : ref,
                  'duration' : '100%',
                  'animations' :  [
                    {
                      'selector'    : '.explosion-byline',
                      'translateY'  : ['-25%', '-40%'],
                      'opacity'     : [1, 0] // hack to accelrate opacity speed
                    }
                  ]
                }
                )
              }}
            
            >
              <p className="explosion-byline">Here's an example of 16 elements scaling, fading and moving at once.</p>
              <ul id="domExplosionList">
                <li className="dom-explosion-item dei-1"></li>
                <li className="dom-explosion-item dei-2"></li>
                <li className="dom-explosion-item dei-3"></li>
                <li className="dom-explosion-item dei-4"></li>
                <li className="dom-explosion-item dei-5"></li>
                <li className="dom-explosion-item dei-6"></li>
                <li className="dom-explosion-item dei-7"></li>
                <li className="dom-explosion-item dei-8"></li>
                <li className="dom-explosion-item dei-9"></li>
                <li className="dom-explosion-item dei-10"></li>
                <li className="dom-explosion-item dei-11"></li>
                <li className="dom-explosion-item dei-12"></li>
                <li className="dom-explosion-item dei-13"></li>
                <li className="dom-explosion-item dei-14"></li>
                <li className="dom-explosion-item dei-15"></li>
                <li className="dom-explosion-item dei-16"></li>
              </ul>
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



