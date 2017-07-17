import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case'
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms'
import { connect } from 'react-redux';
import * as a from './actions'

var endReached = false

class CaseOverview extends React.Component {

  
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
      ref={(ref)=>this.section = ref}>
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



