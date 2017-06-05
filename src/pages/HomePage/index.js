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
import {throttle} from '../../utils/helperFunctions'
import TwitterOverView from '../Twitter/index'

class HomePage extends React.Component {
  componentDidMount(){
    this.throttledScroll = throttle(this.handleScroll, 100)
    window.addEventListener("scroll", this.throttledScroll);
  }

  componentWillUnmount(){
     window.removeEventListener("scroll", this.throttledScroll);
  }

  animate = (element) =>{
    if (document.body.scrollTop + window.innerHeight > element.offsetTop + element.offsetHeight
    || document.documentElement.scrollTop + window.innerHeight > element.offsetTop + element.offsetHeight ) {
       element.classList.remove("center")
    } else {
      //  element.classList.add("center")
    }
  }

  handleScroll = () =>{
    this.animate(this.header)
    this.animate(this.header2)
  }

  header= null

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
            <section>
                <h2 
                ref={r=>this.header=r}
                className="underline center">
                  <DBText dbKey="homepage-skills"/>
                </h2>
                <SkillBubblez />
            </section>
          </Col>
        </Row>
        <div className="divider"></div>
        <Row>
          <Col xs={12} >
            <section>
                <h2 
                ref={r=>this.header2=r}
                className="underline center">
                  <DBText dbKey="homepage-twitter"/>
                </h2>
                <TwitterOverView />
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