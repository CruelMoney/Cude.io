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
let {Github, Twitter, Snapchat, Instagram, ...IconsRest} = Icons


class HomePage extends React.Component {
  state={bubbleTime: false}


  render() {
    const meta = {
      title: 'Christopher Ulrick Dengsø',
      description: 'Christopher Ulrick Dengsø',
      meta: {
        charSet: 'utf-8',
        name: {
         // keywords: 'react,meta,document,html,tags'
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
              
            <a href="https://twitter.com/ChrisDengso">
                <Twitter className={styles.twitter}/>
            </a>
            <a href="https://www.snapchat.com/add/christopherdeng">
                <Snapchat className={styles.snapchat}/>
            </a>
            <a href="https://www.instagram.com/cruelmoneyyy/">
                <Instagram className={styles.instagram}/>
            </a>
            <a href="https://github.com/CruelMoney/">
                <Github className={styles.github} />
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