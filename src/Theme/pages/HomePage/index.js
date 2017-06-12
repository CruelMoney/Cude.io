import React from 'react';
import { Link } from 'react-router';
import DBText from '../../../CMS/components/DBText/index'
import SkillBubblez from '../../blocks/FloatingBubblez/index'
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../../CMS/higher-order-components/Fetcher/index'
import editor from '../../../CMS/higher-order-components/Editor/index'
import CaseOverview from '../CaseOverview/index'
import styles from './index.scss'
import Navigation from '../../blocks/Navigation/index';
import DocumentMeta from 'react-document-meta';
import {throttle} from '../../../CMS/utils/helperFunctions'
import Footer from '../../blocks/Footer/index';
import {EditableText} from '../../../CMS/components/DBText'
import Facebook from '../../../CMS/assets/icons/facebook.svg' 
import Twitter from '../../../CMS/assets/icons/twitter.svg' 
import Snapchat from '../../../CMS/assets/icons/snapchat.svg'
import AnimationFrame from '../../blocks/AnimationFrame/index';
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'

configureAnchors({scrollDuration: 1000})

class HomePage extends React.Component {
  state={bubbleTime: false}


  render() {
    const twitter= this.props.data.social ? this.props.data.social.social.twitter : ""
    const facebook= this.props.data.social ? this.props.data.social.social.facebook : ""
    const snapchat= this.props.data.social ? this.props.data.social.social.snapchat : ""
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


      <ScrollableAnchor id="work">
        <CaseOverview>
          <AnimationFrame
          stickFrame={this.state.stickFrame}
          noInfo={this.state.bubbleTime}
          offsets={60} // The padding
          />
        </CaseOverview>
      </ScrollableAnchor>
      <ScrollableAnchor id="technologies">
        <section className={styles.technology}>
          <Grid fluid className="container">
            <Row>
              <Col xs={12} >
                <section>
                  <h2  className={styles.header + " underline left"} >
                      <DBText dbKey="homepage-technologies">
                        Technologies
                      </DBText>
                    </h2>
                    <SkillBubblez
                      offsets={-45}
                      fullyEnterViewport={() => {
                        this.setState({stickFrame: "-930px"})}}
                      exitViewport={() => {this.setState({bubbleTime:false})}} 
                      enterViewport={() => {this.setState({bubbleTime:true})}} 
                      partiallyExitViewport={(w) => {
                        if(!w.isAboveViewport){
                            this.setState({stickFrame:null})}}
                        }
                    />
                </section>
              </Col>
            </Row>
          </Grid>
        </section>
      </ScrollableAnchor>

      
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
  