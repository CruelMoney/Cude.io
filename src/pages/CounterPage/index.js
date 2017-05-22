import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import selectCounterPage from './selector';
import {
  increaseCounter,
  decreaseCounter,
} from './actions';

const mapStateToProps = selectCounterPage();

// these are mapped to props
const actionCreators = {
  increaseCounter,
  decreaseCounter,
};

class CounterPage extends React.Component {


  render() {
    return (
      <section>
        <h1>Obligatory Counter Example!</h1>
        <div>
          <button onClick={this.props.increaseCounter}>+</button>
          <button onClick={this.props.decreaseCounter}>-</button>
          {this.props.currentCount}
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(CounterPage)

