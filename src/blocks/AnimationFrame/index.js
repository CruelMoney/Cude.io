import React from 'react';
import styles from './index.scss'
import { Watch } from 'scrollmonitor-react';

export default Watch(class CaseFrame extends React.Component {
  componentWillMount(){
    this.props.lockWatcher()
  }

  render(){
    return(
           <div 
            className={styles.lines 
            + (this.props.noInfo ? " " + styles.noInfo : "")
            + (this.props.isAboveViewport ? " " + styles.fixed : "")}>
            <div className={styles.lineT + " " + styles.drawLine}>
              <div className={styles.lineBreaker + " " + styles.lineBreakerLeft}>
                <div className={styles.caseType}>
                  WEBSITE  
                </div>
              </div>
            </div>
            <div className={styles.lineL + " " + styles.drawLine}></div>
            <div className={styles.lineR + " " + styles.drawLine}></div>
            <div className={styles.lineB + " " + styles.drawLine}>
              <div className={styles.caseFacts + " " + styles.lineBreaker + " " + styles.lineBreakerCenter}>
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