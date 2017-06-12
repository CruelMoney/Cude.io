import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.scss'
import Logo from '../../components/Logo/index'
import DBText from '../../../CMS/components/DBText/index'

class Navigation extends React.Component {
  render() {
    return (
        <nav >
            <Grid fluid className="container">           
                <Row between="xs">
                    <Col xs={1}>
                       <Logo />
                    </Col>
                    {/*<Col xs={4}>
                        <NavLink to={'/cases'}>Cases</NavLink>
                         <a href={'/keystone'}>Login</a>
                    </Col>*/}
                    <Col xs={4}>
                    {this.props.editMode ? 
                        <div className={styles.menu}>
                            <DBText dbKey="menu-work"/>
                            <DBText dbKey="menu-technologies"/>
                        </div>
                    : 
                        <div className={styles.menu}>
                            <a href="#work">        
                                <DBText dbKey="menu-work"/>
                            </a>
                            <a href="#technologies">
                                <DBText dbKey="menu-technologies"/>
                            </a>
                        </div>
                    }
                        
                        
                        
                    </Col>
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
