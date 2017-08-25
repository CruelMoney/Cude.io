import React from 'react';
import styles from './index.module.css'
import {LoadingImage, fetcher, Icons} from '../../../CMS/'
import { Row, Col } from 'react-styled-flexboxgrid';



class Instagram extends React.Component {
    
        
    render() {
        const tag = this.props.data.name
        const images = this.props.data.media ? 
            this.props.data.media.nodes
               // .sort((a,b)=>a.date>b.date)
                 :
            []

        return (
            images.length > 0 ?
            <Row center="xs" >
                <Col xs={10} >
                <a href={`https://www.instagram.com/explore/tags/${tag}/`}>
                 <h2>
                     
                        {"#" + tag}
                   
                </h2>
                 </a>
                
                    <FourImages
                    images={images.slice(0,4)}
                    />
             </ Col>
             </Row>
            :
            <div/>
        );
    }   
}


class FourImages extends React.Component {
    
    render() {
        return (
            <Row 
            between="xs"
            >  
              {this.props.images.map((image, idx)=>{return(
              <Col
              xs={12}
              sm={6}
              md={3}
              data-index={idx}
              className={styles.insta}
              key={"insta-"+idx}
              >
               
                <Col>
                 <a href={`https://www.instagram.com/p/${image.code}`} target="_blank">
                    <div className={styles.info}>
                        <Col>
                            <p>
                                <span
                                    className={styles.icon}
                                    style={{backgroundImage:`url(${Icons.InstaHeartFilled})`}}
                                />
                                {image.likes.count}
                                <span
                                    className={styles.icon}
                                    style={{backgroundImage:`url(${Icons.InstaCommentFilled})`}} 
                                />
                                {image.comments.count}
                            </p>
                            <p className={styles.caption}>
                                {image.caption}
                            </p>
                        </Col>
                    </div>
                    <LoadingImage draggable={false} className="image-cover" src={image.display_src} />
                     </a>
                </ Col>
               
              </ Col>
              )
              })
              }
              </Row>
                  
            );
    }   
}

class Wrapper extends React.Component {
    render(){
        const WrappedInsta = fetcher(Instagram, ("/api/instagram/"+this.props.instagramID), false)
        return(
            <WrappedInsta />
        )    
    }
}

export default (Wrapper)

