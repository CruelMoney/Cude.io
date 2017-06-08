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
  
  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
        <div>
          <div 
          key={theCase._id}
          className={styles.caseItem}>
            <span className={styles.caseNumber}>Case {ndx+1}</span>
            <Case case={theCase} />
          </div>
          <div className="divider"/>
        </div>

   );
  }

  render() {
    return (
      <section id="work">
        <Grid fluid className="container">
        <h2 
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
