import React from 'react';
import { Link } from 'react-router';
import DBText from '../../components/DBText/index'

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    alert();
  }

  render() {
    return (
      <section>
        <h1>{this.props.title}</h1>
        <DBText dbKey="test-3"/>
        <DBText dbKey="test-4"/>
        <DBText dbKey="the new field eow"/>
        <button onClick={this.clickHandler}>Click Me!</button>
      </section>
    );
  }
}
