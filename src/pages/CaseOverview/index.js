import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCases } from './actions';
import Case from '../../blocks/Case'
import fetcher from '../../higher-order-components/Fetcher/index'
import styles from './index.scss'
import { Grid, Row, Col } from 'react-flexbox-grid';
import DBText from '../../components/DBText/index'
import {throttle} from '../../utils/helperFunctions'

class CaseOverview extends React.Component {

  componentDidMount(){
    this.throttledScroll = throttle(this.handleScroll, 200)
    window.addEventListener("scroll", this.throttledScroll);
  }

  componentWillUnmount(){
     window.removeEventListener("scroll", this.throttledScroll);
  }

  handleScroll = () =>{
    if (document.body.scrollTop + window.innerHeight > this.header.offsetTop + this.header.offsetHeight + 100
    || document.documentElement.scrollTop + window.innerHeight > this.header.offsetTop + this.header.offsetHeight + 100 ) {
       this.header.classList.remove("center")
    } else {
      //  this.header.classList.add("center")
    }
  }

  

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
        <div 
        key={theCase._id}
        className={styles.caseItem}>
          <Case case={theCase} />
        </div>
   );
  }
  header = null

  render() {
    return (
      <section>
        <Grid fluid className="container">
        <h2 
        ref={header=>this.header=header}
        className={styles.header + " underline center"} >
        <DBText dbKey="case-overview-header"/>
        </h2>
        </Grid>

          {this.renderCases()}
  
      </section>
    );
  }
}

export default fetcher(CaseOverview, '/api/cases')
