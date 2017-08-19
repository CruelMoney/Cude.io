import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import Logo from '../../components/Logo/index'
import {DBText} from 'cude-cms'

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
                    
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
