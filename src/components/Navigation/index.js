import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Facebook from '../../assets/icons/facebook.svg' 
import Twitter from '../../assets/icons/twitter.svg' 
import Snapchat from '../../assets/icons/snapchat.svg'
import styles from './index.scss'
import Logo from '../Logo/index'
import GithubWidget from '../GithubWidget/index'

class Navigation extends React.Component {
  render() {
    return (
        <nav >
            <Grid fluid className="container">           
                <Row between="xs">
                    <Col xs={1}>
                       <Logo />
                    </Col>
                    {/*<Col xs>
                        <NavLink to={'/cases'}>Cases</NavLink>
                    </Col>
                    <Col xs>
                        <a href={'/keystone'}>Login</a>
                    </Col>*/}
                    <Col xs>
                        <div className={styles.social}>
                            <a href={this.props.facebook}>
                                <Facebook className={styles.facebook} />
                            </a>
                            <a href={this.props.twitter}>
                                <Twitter className={styles.twitter}/>
                            </a>
                            <a href={this.props.snapchat}>
                                <Snapchat className={styles.snapchat}/>
                            </a>
                        </div>

                        <GithubWidget/>
                        
                    </Col>
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
