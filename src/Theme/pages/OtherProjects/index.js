import React from 'react';
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {
  EditableText,
  fetcher
} from 'cude-cms';
import Bricks from 'bricks.js'
import CudeImage from '../../components/CudeImage'
import Button from '../../components/Button/index'
import LinkIcon from '../../assets/icons/link.svg'

class OtherProjects extends React.Component {
  state = {
    projects: []
  }

  componentWillMount(){
    console.log(this.props)
    this.setState({
      projects: this.props.data
    })
  }

  search=(query)=>{
    const newProjects = this.props.data.filter(project=>{
      return (
        (project.tags && project.tags.toLowerCase().includes(query.toLowerCase())) ||
        project.type.toLowerCase().includes(query.toLowerCase()) ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.year.toLowerCase().includes(query.toLowerCase()) ||
        project.agency.toLowerCase().includes(query.toLowerCase())
      )
    })

    this.setState({
      projects: newProjects
    })
  }

  packBricks(container){
    const sizes = [
      { columns: 1, gutter: 44 },
      { mq: '48em', columns: 2, gutter: 40 },        
      { mq: '64em', columns: 3, gutter: 40 },
      { mq: '75em', columns: 3, gutter: 40 }
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

  renderProjects=()=>{
    return  this.state.projects
        .reduce((sum, val)=>{
          const projects = val.images
            .map(img=>{
              return <Project 
                type={val.type}
                title={val.title}
                image={img} />
            })
          return [ 
            ...sum, 
            ...projects
          ]
        }, []) 
  }

  renderInstas=()=>{
    const instas = this.props.data.media ? 
            this.props.data.media.nodes
               // .sort((a,b)=>a.date>b.date)
                 :
            []

    return instas.map(insta=>{
      return <Project 
        type={"instagram"}
        title={"instagram"}
        image={insta.display_src} />
    })
    
  }

  render() {

    return(
      <div className={styles.projectsBackground}>
        <Grid fluid className="container">
          <Row end="xs" >
            <Col xs={12}>
        <input 
            className={styles.search}
            type="text" 
            onChange={(e)=>this.search(e.target.value)}
            placeholder="Search"/>
            </Col>
            </Row>
        </Grid>
        <div
          ref={r=>{
              if(r){
                this.packBricks(r)
              }
            }}
          className={styles.container}
        >
             
           {this.renderProjects()}
            {this.renderInstas()}
        </div>
      </div>
  )
}
}

export default fetcher(OtherProjects, '/api/cases')





class Project extends React.Component{
  
  render(){
      return  (
       
        <div
          key={this.props.image._id}
          className={styles.gridItem} >
          <div className={styles.overlay}>
              <div className={styles.scaleIn}>
               <LinkIcon />
              </div>
              <div className={styles.revealUp}>
                  <h4>VISIT {this.props.type}</h4>
              </div>

          </div>
        <CudeImage
          id={this.props.image._id}
          src={this.props.image.secure_url} />

      </div>
  )}
}