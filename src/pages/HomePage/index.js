import React from 'react';
import { Link } from 'react-router';
import DBText from '../../components/DBText/index'
import { Grid, Row, Col } from 'react-flexbox-grid';

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
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <section>
              <h1>Hi my name is Christopher Q</h1>
              <div className="divider"></div>
              <DBText dbKey="test-3"/>
              <DBText dbKey="test-4"/>
              <DBText dbKey="the new field eow"/>
              <button onClick={this.clickHandler}>Click Me!</button>
            </section>
          </Col>
        </Row>
      </Grid>
      
    );
  }
}
