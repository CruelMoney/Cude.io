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
                <Row between="xs" bottom="xs">
                    <Col xs={1}>
                       <Logo />
                    </Col>
                    <Col xs={4}>
                        <button>search projects & skills</button>
                    </Col>
                    
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
