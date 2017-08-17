import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import {
  PandaPlaceholder
} from 'cude-cms';

class Case extends React.Component {
  
  render() {
    return(
    <div className={styles.case}>
      <Grid
        className="container"
        fluid>
        <Row>
          <Col xs={10} xsOffset={1}>
            <div
              className={styles.background}
            >
              <Row middle={"xs"} center={"xs"}>
                <Col xs={10} xsOffset={1}>
                  <PandaPlaceholder />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  )}
}

export default Case
  