import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import {connect} from 'react-redux'
import Logo from '../../components/Logo/index'
import {DBText} from 'cude-cms'
import {search} from '../../pages/OtherProjects/actions'
import Github from '../Github'

class Navigation extends React.Component {
  state={}

  render() {
    return (
        <nav ref={this.props.ref} >
            <Grid fluid className="container">           
                <Row between="xs" bottom="xs">
                    <Col xs={4}>
                       <Logo />
                    </Col>
                    <Col xs={8} className={styles.githubStats}>
                        <Github />
                    </Col>
                    
                </Row>
             </Grid>
        </nav>
        );
        }
    }

const mapDispatchToProps = (dispatch) =>{
    return{
        enableSearch: ()=>dispatch(search(' '))
    }
}

export default connect(state=>state, mapDispatchToProps)(Navigation)
