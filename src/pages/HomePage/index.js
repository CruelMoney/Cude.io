import React from 'react';
import { Link } from 'react-router';
import DBText from '../../components/DBText/index'
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../higher-order-components/Fetcher/index'


class HomePage extends React.Component {

  render() {
    const email = this.props.data.general ? this.props.data.general.contact.email : null
    return (
      <Grid fluid className="container">
         <div className="divider"></div>
        <Row>
          <Col xs={12} >
            <section>
              <p className="h1">
                <DBText dbKey="homepage-introduction"/>
                <a href={"mailto:"+email}>
                  {email}
                </a>
              </p>
            
              <div className="divider"></div>
            </section>
          </Col>
        </Row>
      </Grid>
      
    );
  }
}

export default fetcher(HomePage, '/api/configuration')