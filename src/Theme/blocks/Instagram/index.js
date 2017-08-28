import React from 'react';
import {fetcher} from 'cude-cms'

// Class for serving instas to wrapped component
export default function instaFetcher(
    WrappedComponent, 
    InstaID, 
    serverFetch = false // Fetching on server? Will increase response time
) {

    class Instagram extends React.Component {

        render(){
            const {data, ...rest} = this.props
            return(
            <WrappedComponent
            {...rest}
            instas={data}
            />
        )}
    }


    return  fetcher(Instagram, ("/api/instagram/"+InstaID), serverFetch)

}

// class Instagram extends React.Component {
    
//     render() {
//         const tag = this.props.data.name
//         const images = this.props.data.media ? 
//             this.props.data.media.nodes
//                // .sort((a,b)=>a.date>b.date)
//                  :
//             []

//         return (
//             images.length > 0 ?
//             <Row center="xs" >
//                 <Col xs={10} >
//                 <a href={`https://www.instagram.com/explore/tags/${tag}/`}>
//                  <h2>
                     
//                         {"#" + tag}
                   
//                 </h2>
//                  </a>
                
//                     <FourImages
//                     images={images.slice(0,4)}
//                     />
//              </ Col>
//              </Row>
//             :
//             <div/>
//         );
//     }   
// }



// class Wrapper extends React.Component {
//     render(){
//         const WrappedInsta = fetcher(Instagram, ("/api/instagram/"+this.props.instagramID), false)
//         return(
//             <WrappedInsta />
//         )    
//     }
// }

// export default (Wrapper)

