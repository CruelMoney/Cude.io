import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from './actions';


const mapStateToProps = (state, ownProps) => {
  return {
    posts:  state.blogReducer.posts
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { fetchPosts: () => dispatch(fetchPosts()) }
}

class BlogLandingPage extends React.Component {

  constructor() {
    super();
  }

  componentWillMount () {
    if (this.props.posts.length === 0) this.props.fetchPosts()
  }

  renderPostsLinks = () => {
    return this.props.posts.map((post, ndx) =>
      <li key={ndx}>
        <Link to={`/posts/${post.key}`}>
          {post.name}
        </Link>
        {post.categories.length > 0 &&
          post.categories.map((category) =>
            <Link to={`/post?category=${category.key}`}>
              {category.name}
            </Link>
          )
        }
      </li>);
  }

  render() {
    return (
      <section className="blog-landing-page">
        <h1>Posts</h1>
        <ul>
        {this.renderPostsLinks()}
        </ul>
        {this.props.children}
      </section>
    );
  }
}

BlogLandingPage.fetchData = ({ store }) => store.dispatch(fetchPosts())

export default connect(mapStateToProps,mapDispatchToProps)(BlogLandingPage)
