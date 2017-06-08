import React from 'react';
import { Link } from 'react-router';
import DBText from '../../components/DBText/index'
import SkillBubblez from '../../blocks/FloatingBubblez/index'
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../higher-order-components/Fetcher/index'
import editor from '../../higher-order-components/Editor/index'
import CaseOverview from '../CaseOverview/index'
import styles from './index.scss'
import Navigation from '../../blocks/Navigation/index';
import DocumentMeta from 'react-document-meta';
import {throttle} from '../../utils/helperFunctions'
import TwitterOverView from '../Twitter/index'
import Footer from '../../blocks/Footer/index';
 import {EditableText} from '../../components/DBText'
import Facebook from '../../assets/icons/facebook.svg' 
import Twitter from '../../assets/icons/twitter.svg' 
import Snapchat from '../../assets/icons/snapchat.svg'

class HomePage extends React.Component {
  


  render() {
    const twitter= this.props.data.social ? this.props.data.social.social.twitter : ""
    const facebook= this.props.data.social ? this.props.data.social.social.facebook : ""
    const snapchat= this.props.data.social ? this.props.data.social.social.snapchat : ""
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
        <div className={styles.social}>
            <a href={facebook}>
                <Facebook className={styles.facebook} />
            </a>
            <a href={twitter}>
                <Twitter className={styles.twitter}/>
            </a>
            <a href={snapchat}>
                <Snapchat className={styles.snapchat}/>
            </a>
          </div>
      </div>
      <CaseOverview/>
      
      <section className={styles.technology} id="technologies">
        <Grid fluid className="container">
          <Row>
            <Col xs={12} >
              <section>
                  {/*<h2 
                  className="underline">
                    <DBText dbKey="homepage-skills"/>
                  </h2>*/}
                  <SkillBubblez />
              </section>
            </Col>
          </Row>
        </Grid>
      </section>

      
        {/*<Grid fluid className="container">
          <Row>
            <Col xs={12} >
              <section>
                  <h2 
                  className="underline">
                    <DBText dbKey="homepage-twitter"/>
                  </h2>
                  <TwitterOverView />
              </section>
            </Col>
          </Row>
          <div className="divider"></div>
        </Grid>*/}
        
        <Footer 
          configuration={this.props.data}
        />

     </div>
      
      
    );
  }
}

export default fetcher(
  editor(HomePage, '/api/configuration'), '/api/configuration')
  