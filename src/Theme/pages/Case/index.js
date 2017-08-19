import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import {
  PandaPlaceholder,
  EditableText,
  editor
} from 'cude-cms';

class Case extends React.Component {
  
  render() {
    return(
    <div className={styles.case  + " " + (this.props.hide ? styles.hide : "")}>
      <Grid
        className="container"
        fluid>
        <Row>
          <Col xs={10} xsOffset={1}>
            <div
              className={styles.background}
            >
       
                {
                  this.props.case.content.extended ? 
                  <EditableText 
                      {...this.props}
                      className={styles.extendedContent}
                      content={this.props.case.content.extended}
                      entityID={this.props.case._id}
                      entityField="content.extended"
                    />
                  :
                  <div className={styles.placeholder}>
                    <PandaPlaceholder />
                  </div>
                }
                 
          
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  )}
}

export default editor(Case, '/api/cases')
  