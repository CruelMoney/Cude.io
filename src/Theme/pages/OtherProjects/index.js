import React from 'react';
import styles from './index.module.css'
import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import {EditableText, fetcher} from 'cude-cms';
import Bricks from 'bricks.js'
import CudeImage from '../../components/CudeImage'
import Button from '../../components/Button/index'
import LinkIcon from '../../assets/icons/link.svg'

class OtherProjects extends React.Component {
  state = {
    projects: [],
    instas: []
  }

  componentWillMount() {
    this.setState({projects: this.props.data})
  }

  componentDidMount() {
    this.fetchInstas()
  }

  fetchInstas = () => {
    fetch('/api/instagram',{credentials: 'include'})
    .then(res=>res.json())
    .then((res) =>{
      
      const instas = res.reduce((acc, val)=>{
        return [...acc, ...val.tag.media.nodes]
      }, [])

      const projects = instas.map(img=>{
        const image = {
          url: img.display_src,
          ratio:  (img.dimensions.height / img.dimensions.width),
          height: img.dimensions.height,
          width: img.dimensions.width
        }
        return(
          <div key={img.display_src} data-key={img.display_src}  className={styles.gridItem}>
          <Project 
            url={`https://www.instagram.com/p/${img.code}`} 
            type={"instagram"} 
            title={"instagram"} 
            image={image}/>
          </div>
        )
      })
      this.setState({
        instas: projects
      })

    })
    .catch(err=>{console.log(err)})
  }


  search = (query) => {
    const newProjects = this
      .props
      .data
      .filter(project => {
        return ((project.tags && project.tags.toLowerCase().includes(query.toLowerCase())) || 
                project.type.toLowerCase().includes(query.toLowerCase()) || 
                project.title.toLowerCase().includes(query.toLowerCase()) || 
                project.year.toLowerCase().includes(query.toLowerCase()) || 
                project.agency.toLowerCase().includes(query.toLowerCase()))
      })

    this.setState({projects: newProjects, searching : !!query})
  }

  packBricks(container) {
    const sizes = [
      {
        columns: 1,
        gutter: 44
      }, {
        mq: '48em',
        columns: 2,
        gutter: 40
      }, {
        mq: '64em',
        columns: 3,
        gutter: 40
      }, {
        mq: '75em',
        columns: 3,
        gutter: 40
      }
    ]
    const bricks = Bricks({container: container, packed: 'data-packed', sizes: sizes})

    // Polling for the sake of my intern tests
    var interval = setInterval(function () {
      if (document.readyState === 'complete') {
        clearInterval(interval);

        bricks.resize(true) // bind resize handler
          .pack()

      }
    }, 100);

  }

  renderProjects = () => {
    let idx = 0
    let jdx = 0
    const instasCount = this.state.instas.length
    const projectsCount = this.state.projects.reduce((acc, val)=>{return val.images.length + acc}, 0)
    const insertEvery = instasCount !== 0 ? Math.floor(projectsCount/instasCount) : false
    
    const renderThis = this.state.projects
      .reduce((sum, project) => {
        const projects = project.images
          .reduce((acc, val) => {
            acc = [...acc,  
            <div key={val.url} data-key={"other-project-"+idx} className={styles.gridItem}>
              <Project url={project.link} type={project.type} title={project.title} image={val}/>
            </div>]
            // Sprinkle in instas
            if(!this.state.searching && insertEvery && (idx++ % insertEvery === 0)){
              acc.push(this.state.instas[jdx++])
            }
            return acc
          }, [])
        
        return [
          ...sum,
          ...projects,
        ]

      }, [])

      return renderThis
  }


  render() {

    return (
      <div  className={styles.projectsBackground}>
        <Grid fluid className="container">
          <Row end="xs">
            <Col xs={12}>
              <input
                className={styles.search}
                type="text"
                onChange={(e) => this.search(e.target.value)}
                placeholder="Search"/>
            </Col>
          </Row>
        </Grid>
        <div
          ref={r => {
          if (r) {
            this.packBricks(r)
          }
        }}
          className={styles.container}>

          {this.renderProjects()}

        </div>
      </div>
    )
  }
}
export default  fetcher(OtherProjects, '/api/cases')


class Project extends React.Component {

  render() {
    return (
      
          <a href={this.props.url} target="_blank">
          <div className={styles.overlay}>
            <div className={styles.scaleIn}>
              <LinkIcon/>
            </div>
            <div className={styles.revealUp}>
              <h4>{this.props.type}</h4>
            </div>

          </div>
          <CudeImage
          {...this.props.image}
          maxratio={1.5}
          />
          </a>
    )
  }
}