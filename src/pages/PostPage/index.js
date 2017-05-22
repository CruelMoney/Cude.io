import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const mapStateToProps = (state, ownProps) => {
  let id = ownProps.params.postID
  return {
    post:  state.blogReducer.posts.find(p=>p.key===id)
  }
}

class PostPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <section className="post">
        <h1>{this.props.post.name}</h1>
      </section>
    );
  }
}

export default connect(mapStateToProps)(PostPage)

