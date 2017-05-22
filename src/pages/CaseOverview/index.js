import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCases } from './actions';
import Case from '../../blocks/Case'

const mapStateToProps = (state, ownProps) => {
  return {
    cases:  state.caseOverview.cases
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { fetchCases: () => dispatch(fetchCases()) }
}

class CaseOverview extends React.Component {

  componentWillMount () {
    if (this.props.staticContext){
      const store = this.props.staticContext.store
      this.props.staticContext.promises.push(store.dispatch(fetchCases()))
    }else{
      if (this.props.cases.length === 0) this.props.fetchCases()
    }
  }

  renderCases = () => {
    return this.props.cases.map((theCase, ndx) =>
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
        {this.props.children}
      </section>
    );
  }
}

CaseOverview.fetchData = ({ store }) => store.dispatch(fetchCases())

export default connect(mapStateToProps,mapDispatchToProps)(CaseOverview)
