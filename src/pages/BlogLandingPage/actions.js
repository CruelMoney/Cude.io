import fetch from 'isomorphic-fetch';



export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'  
export function getPostsRequest () {  
  return { type: GET_POSTS_REQUEST }
}

export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'  
export function getPostsFailure () {  
  return { type: GET_POSTS_FAILURE }
}

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'  
export function getPostsSuccess (posts) {  
  return { type: GET_POSTS_SUCCESS, posts }
}

export function fetchPosts () { 
  console.log(process.env);

  return (dispatch, getState) => {
    dispatch(getPostsRequest())
    return fetch(process.env.REACT_APP_BASEURL+'/api/posts')
      .then(res=>res.json())
      .then((res) =>dispatch(getPostsSuccess(res.posts)))
      .catch(err=>dispatch(getPostsFailure()))
  }
}