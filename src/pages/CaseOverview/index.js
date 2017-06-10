import React from 'react';
import { Link } from 'react-router';
import { fetchCases } from './actions';
import Case from '../../blocks/Case'
import fetcher from '../../higher-order-components/Fetcher/index'
import styles from './index.scss'
import { Grid, Row, Col } from 'react-flexbox-grid';
import DBText from '../../components/DBText/index'
import { connect } from 'react-redux';
import * as a from './actions'

var endReached = false

class CaseOverview extends React.Component {
  // componentDidMount(){
  //   //this.throttledScroll = throttle(this.handleScroll, 300)
  //     window.addEventListener("scroll", this.handleScroll);
  // }
  // componentWillUnmount(){
  //     window.removeEventListener("scroll", this.throttledScroll);
  // }
  // handleScroll = () =>{
  //   var rect = this.section.getBoundingClientRect();
  //   if (rect.top <= -165) {
  //     if(rect.bottom - window.innerHeight + 165 >= 0){
  //       this.caseFrame.style.position = "fixed"
  //       this.caseFrame.style.top = "0"
  //       endReached = false
  //     }else if(!endReached){ //scroll end reached
  //      endReached = true
  //      this.caseFrame.style.position = "absolute"
  //      this.caseFrame.style.top = "initial"
  //      this.caseFrame.style.bottom = "-165px"
  //     }
      
  //   } else {
  //      this.caseFrame.style.position = "absolute"
  //      this.caseFrame.style.top = "165px"
  //   }
  // }
  
  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
        <div>
          
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
          
        </div>

   );
  }

  render() {
    return (
      <section 
      ref={(ref)=>this.section = ref}
      id="work">
        <Grid fluid className="container">
        <h2 
        className={styles.header + " underline center"} >
        <DBText dbKey="case-overview-header"/>
        </h2>
        </Grid>

          {this.props.children}
          {this.renderCases()}
          
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {  
      return { pushCaseInfo: (theCase) => dispatch(a.pushCaseInfo(theCase)) }
}


CaseOverview = connect(state=>state, mapDispatchToProps)(CaseOverview)


export default fetcher(CaseOverview, '/api/cases')



