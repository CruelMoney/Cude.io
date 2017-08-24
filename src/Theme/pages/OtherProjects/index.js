import React from 'react';
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {
  EditableText,
  fetcher
} from 'cude-cms';
import Bricks from 'bricks.js'
import CudeImage from './cudeImage'


class OtherProjects extends React.Component {
  state = {
  }

  

  packBricks(container){
    const sizes = [
      { columns: 1, gutter: 44 },
      { mq: '48em', columns: 2, gutter: 44 },        
      { mq: '64em', columns: 3, gutter: 44 },
      { mq: '75em', columns: 3, gutter: 44 }
    ]
    const bricks = Bricks({
      container: container,
      packed: 'data-packed',
      sizes: sizes,
    })

    // Polling for the sake of my intern tests
    var interval = setInterval(function() {
      if(document.readyState === 'complete') {
          clearInterval(interval);
          
          bricks
          .resize(true)     // bind resize handler
          .pack()

      }    
    }, 100);

  

  }

  renderProjects(){
    const images = 
      this.props.data
        .reduce((sum, val)=>{
          return [ 
            ...sum, 
            ...val.images
          ]
        }, [])
        
      
    const res = images.map(img=>{
         return ( <div 
             key={img._id}
             className={styles.gridItem} >
             <CudeImage 
              id={img._id}
              src={img.secure_url} />
           </div>)
    })
    return res 
  }

  render() {

    return(
      <div className={styles.projectsBackground}>
        <div
          ref={r=>{
              if(r){
                this.packBricks(r)
              }
            }}
          className={styles.container}
        >
           {this.renderProjects()}
         
        </div>
      </div>
  )
}
}

export default fetcher(OtherProjects, '/api/cases')


