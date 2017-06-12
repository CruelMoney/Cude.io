import React from 'react';
import styles from './index.scss'
import { Timeline } from 'react-twitter-widgets'
import Masonry from 'react-masonry-component';
import Script from 'react-load-script'
import TweetEmbed from 'react-tweet-embed'


class TwitterOverview extends React.Component {
  
  componentDidMount(){
    setTimeout(()=>{
     this.setState({
      reload: true
    })
    },2000)
   
  }


  render() {



    return (
      <div>
           <Masonry
                className={styles.masonry} // default ''
                elementType={'ul'} // default 'div'
                //options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
            >
 
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='863905233939943428' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='859933696685621248' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='859106750032728067' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='853249857666023424' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='845078334077894658' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='842153224975056896' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='841604041885003776' />
            </li>


            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='837735473745289218' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='831783809335050241' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='827273088844705795' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='818848654647853058' />
            </li>
            <li>
              <TweetEmbed options={{cards: 'hidden' }} id='836648785359024128' />
            </li>


        </Masonry>


      </div>
    );
  }
}

export default TwitterOverview
