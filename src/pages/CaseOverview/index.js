import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCases } from './actions';
import Case from '../../blocks/Case'
import fetcher from '../../higher-order-components/Fetcher/index'



class CaseOverview extends React.Component {

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
      <li key={ndx}>
        <Case case={theCase} />
      </li>);
  }

  render() {
    return (
      <section className="case-overview">
        <h1>Cases</h1>
        <ul>
        {this.renderCases()}
        </ul>
      </section>
    );
  }
}

export default fetcher(CaseOverview, '/api/cases')
