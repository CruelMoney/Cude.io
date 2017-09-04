import React from 'react';
import { Link } from 'react-router';
import {DBText, fetcher, editor, EditableText, Icons} from 'cude-cms'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import CaseOverview from '../CaseOverview'
import OtherProjects from '../OtherProjects'
import styles from './index.module.css'
import Navigation from '../../blocks/Navigation/index';
import DocumentMeta from 'react-document-meta';
import Footer from '../../blocks/Footer/index';
let {Facebook, Twitter, Snapchat, Instagram, ...IconsRest} = Icons


class HomePage extends React.Component {
  state={bubbleTime: false}


  render() {
    console.log(IconsRest)
    const twitter   = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.twitter : ""
    const facebook  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.facebook : ""
    const snapchat  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.snapchat : ""
    const instagram  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.snapchat : ""
    
    const meta = {
      title: 'Cude CMS Test',
      description: 'React, redux, auto API',
      meta: {
        charSet: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };
    const email = 'chrdengso@gmail.com'
    return (
      <div>
      <div className={styles.hero}>
        <header>
          <DocumentMeta {...meta} extend />
          <Navigation />
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
           
            <a href={twitter}>
                <Twitter className={styles.twitter}/>
            </a>
            <a href={snapchat}>
                <Snapchat className={styles.snapchat}/>
            </a>
            <a href={instagram}>
                <Instagram className={styles.instagram}/>
            </a>
            <a href={facebook}>
                <Facebook className={styles.facebook} />
            </a>
          </div>
      </div>


      
      
        <CaseOverview 
          selectedCases={this.props.data.cases}
        />

        <OtherProjects />

        <Footer /> 

     </div>
      
      
    );
  }
}

export default fetcher(HomePage,'/api/homepage')