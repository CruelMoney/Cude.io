import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {fetcher, Icons} from 'cude-cms'
import styles from './index.module.css'
let {Facebook, Twitter, Snapchat, Instagram, ...IconsRest} = Icons


class Footer extends React.Component {

  render(){
    const twitter   = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.twitter : ""
    const facebook  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.facebook : ""
    const snapchat  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.snapchat : ""
    const instagram  = (this.props.data.social && this.props.data.social.social) ? this.props.data.social.social.snapchat : ""
    
    const data = this.props.data ? 
      this.props.data.general ? this.props.data.general.contact : {address: {}} : {address: {}} 

    return(
      <footer>
        
              <div className={styles.me}>
                  <p>
                    <span>Christopher Ulrick Dengsø</span> <br/>
                    {/* {data.address.suburb + ", " + data.address.country} <br/>
                    <a href={"tel:"+data.phone}>{data.phone}</a> <br/>
                    <a href={"mailto:"+data.email}>{data.email}</a> <br/>
                    CVR: {data.cvr} */}
                  </p>


              </div>
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
             <GithubWidget
                className={styles.git}
             />
      </footer>
  )}
}

export default fetcher(Footer,'/api/configuration')

