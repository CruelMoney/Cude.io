import React from 'react';
import styles from './index.scss'
import { Hashtag } from 'react-twitter-widgets'
import DBText from '../../components/DBText/index'



class TwitterOverview extends React.Component {


  render() {
    return (
      <section>
          <h2>
            <DBText dbKey="homepage-twitter"/>
          </h2>
          <Hashtag
            hashtag="suhdude"
            options={{
              username: 'ChrisDengso',
              height: '400'
            }}
            onLoad={() => console.log('Timeline is loaded!')}
          />
      </section>
    );
  }
}

export default TwitterOverview
