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
    return(
           <div 
            style={{
              position: (this.props.stickFrame ? "absolute" : null),
              bottom: this.props.stickFrame,
              top: this.props.stickFrame ? "initial" : null}}
            className={styles.lines 
            + (this.props.noInfo || this.props.isBelowViewport ? " " + styles.noInfo : "")
            + (this.props.isAboveViewport ? " " + styles.fixed : "")
            + (this.state.animate ? " " + styles.animate : "")
           }>
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
                  {this.props.currentCase.type}
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
                <CSSTransitionGroup
                  transitionName={ {
                    enter: styles.translateEnter2,
                    enterActive: styles.translateEnterActive2,
                    leave: styles.translateLeave2,
                    leaveActive: styles.translateLeaveActive2,
                  } }
                  transitionEnterTimeout={0}
                  transitionLeaveTimeout={500}>
                {this.props.currentCase.role ? 
                <div 
                key={this.props.currentCase._id + "role"}
                className={styles.fact}>
                  Role
                  <span>{this.props.currentCase.role}</span>
                </div>
                : null}
                {this.props.currentCase.agency ? 
                <div 
                  key={this.props.currentCase._id + "agency"}
                  className={styles.fact}>
                  Agency
                  <span>{this.props.currentCase.agency}</span>
                </div>
                : null}
                {this.props.currentCase.year ? 
                <div 
                key={this.props.currentCase._id + "year"}
                className={styles.fact}>
                  Year
                  <span>{this.props.currentCase.year}</span>
                </div>
                : null}
                </CSSTransitionGroup>
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

