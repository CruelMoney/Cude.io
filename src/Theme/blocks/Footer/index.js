import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GithubWidget from '../../components/GithubWidget/index'
import styles from './index.scss'


class Footer extends React.Component {

  render(){

    const data = this.props.configuration ? 
      this.props.configuration.general ? this.props.configuration.general.contact : {address: {}} : {address: {}} 

    return(
      <footer>
        
              <div className={styles.me}>
                  <p>
                    <span>Christopher Ulrick Dengsø</span> <br/>
                    {data.address.suburb + ", " + data.address.country} <br/>
                    <a href={"tel:"+data.phone}>{data.phone}</a> <br/>
                    <a href={"mailto:"+data.email}>{data.email}</a> <br/>
                    CVR: {data.cvr}
                  </p>
              </div>
             <GithubWidget
                className={styles.git}
             />
      </footer>
  )}
}

export default Footer

