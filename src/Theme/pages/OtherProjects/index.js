import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import {
  EditableText,
  fetcher
} from 'cude-cms';

class OtherProjects extends React.Component {
  
  render() {
    return(
      <div>
        Hola
      </div>
  )
}
}

export default fetcher(Case, '/api/cases')
  