import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCases } from './actions';
import Case from '../../blocks/Case'
import fetcher from '../../higher-order-components/Fetcher/index'
import styles from './index.scss'
import { Grid, Row, Col } from 'react-flexbox-grid';


class CaseOverview extends React.Component {

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
      <Col xs={10} xsOffset={1}
        className={styles.caseItem}
        key={ndx}>
        <Case case={theCase} />
      </Col>);
  }

  render() {
    return (
      <section>
        <h2
          className={styles.header}
        >Cases</h2>
        <Row >
          {this.renderCases()}
        </Row>
      </section>
    );
  }
}

export default fetcher(CaseOverview, '/api/cases')
