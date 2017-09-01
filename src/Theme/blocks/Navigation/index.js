import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import {connect} from 'react-redux'
import Logo from '../../components/Logo/index'
import {DBText} from 'cude-cms'
import {search} from '../../pages/OtherProjects/actions'

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
                        <button
                            onClick={this.props.enableSearch}
                        >search projects & skills</button>
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
