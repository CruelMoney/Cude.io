import React from 'react';
import { Link } from 'react-router';
import DBText from '../../components/DBText/index'
import SkillBubblez from '../../blocks/FloatingBubblez/index'
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../higher-order-components/Fetcher/index'
import CaseOverview from '../CaseOverview/index'
import styles from './index.scss'
import Navigation from '../../components/Navigation/index';
import DocumentMeta from 'react-document-meta';

class HomePage extends React.Component {

  render() {
    const meta = {
      title: 'Cude CMS Test',
      description: 'React, redux, auto API',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };
    const email = this.props.data.general ? this.props.data.general.contact.email : null
    return (
      <div>
      <div className={styles.hero}>
        <header>
          <DocumentMeta {...meta} extend />
          <Navigation 
            twitter={this.props.data.social ? this.props.data.social.social.twitter : ""}
            facebook={this.props.data.social ? this.props.data.social.social.facebook : ""}
            snapchat={this.props.data.social ? this.props.data.social.social.snapchat : ""}
          />
        </header>
        <Grid   
        fluid className={"container"}>
          <div className="divider"></div>
          <Row>
            <Col xs={12} >
              <section>
                <div className="h1">
                  <DBText dbKey="homepage-introduction"/>
                  <a href={"mailto:"+email}>
                    {email}
                  </a>
                </div>
              </section>
            </Col>
          </Row>
        </Grid>
      </div>
      <CaseOverview/>
      
      <Grid fluid className="container">
         <div className="divider"></div>
      <Row>
          <Col xs={12} >
            
          </Col>
        </Row>
         <div className="divider"></div>
         <Row>
          <Col xs={12} >
            <section>
                <h2 className="underline">
                  <DBText dbKey="homepage-skills"/>
                </h2>
                <SkillBubblez />
            </section>
          </Col>
        </Row>
        <div className="divider"></div>
      </Grid>
     </div>
      
      
    );
  }
}

export default fetcher(HomePage, '/api/configuration')