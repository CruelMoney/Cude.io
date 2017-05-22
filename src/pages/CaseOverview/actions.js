import fetch from 'isomorphic-fetch';



export const GET_CASES_REQUEST = 'GET_CASES_REQUEST'  
export function getCasesRequest () {  
  return { type: GET_CASES_REQUEST }
}

export const GET_CASES_FAILURE = 'GET_CASES_FAILURE'  
export function getCasesFailure () {  
  return { type: GET_CASES_FAILURE }
}

export const GET_CASES_SUCCESS = 'GET_CASES_SUCCESS'  
export function getCasesSuccess (Cases) {  
  return { type: GET_CASES_SUCCESS, Cases }
}

export function fetchCases () { 
  return (dispatch, getState) => {
    dispatch(getCasesRequest())
    return fetch(process.env.REACT_APP_BASEURL+'/api/cases')
      .then(res=>res.json())
      .then((res) =>dispatch(getCasesSuccess(res.cases)))
      .catch(err=>dispatch(getCasesFailure()))
  }
}