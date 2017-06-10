import React from 'react';
import styles from './index.scss'
import { Watch } from 'scrollmonitor-react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

var CaseFrame = Watch(class CaseFrame extends React.Component {
  state={animate:false}

  componentWillMount(){
    this.props.lockWatcher() // dont recalculate position, because its getting fixed
  }


  render(){
    console.log(this.props)
    return(
           <div 
            className={styles.lines 
            + (this.props.noInfo || this.props.isBelowViewport ? " " + styles.noInfo : "")
            + (this.props.isAboveViewport ? " " + styles.fixed : "")
            + (this.state.animate ? " " + styles.animate : "")}>
            <div className={styles.lineT + " " + styles.drawLine}>
              <div className={styles.lineBreaker + " " + styles.lineBreakerLeft}>
                <div 
                style={{color:this.props.currentCase.primaryColor}}
                className={styles.caseType}>
                <CSSTransitionGroup
                  transitionName={ {
                    enter: styles.translateEnter,
                    enterActive: styles.translateEnterActive,
                    leave: styles.translateLeave,
                    leaveActive: styles.translateLeaveActive,
                  } }
                  transitionEnterTimeout={1000}
                  transitionLeaveTimeout={500}>
                  <div key={this.props.currentCase._id}>
                  {this.props.currentCase.state}
                  </div>
                </CSSTransitionGroup>
                </div>
              </div>
            </div>
            <div className={styles.lineL + " " + styles.drawLine}></div>
            <div className={styles.lineR + " " + styles.drawLine}></div>
            <div className={styles.lineB + " " + styles.drawLine}>
              <div 
              className={styles.caseFacts + " " + styles.lineBreaker + " " + styles.lineBreakerCenter}>
                <div className={styles.fact}>
                  Role
                  <span>Frontend</span>
                </div>
                <div className={styles.fact}>
                  Agency
                  <span>Supertusch</span>
                </div>
                <div className={styles.fact}>
                  Year
                  <span>2017</span>
                  </div>  
              </div>

            </div>
          </div>
      )
  }
})

const mapStateToProps = (state) =>{
  return{
    currentCase:state.currentCase
  }
}

export default connect(mapStateToProps)(CaseFrame)

