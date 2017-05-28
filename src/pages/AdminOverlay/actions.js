
export const LOGOUT = 'LOGOUT'  
export function logout () {  
  return { type: LOGOUT }
}

export const TOGGLE_EDITMODE = 'TOGGLE_EDITMODE'  
export function toggleEditmode () {  
  return { type: TOGGLE_EDITMODE }
}

export const SAVE_EDITS_REQUESTED = 'SAVE_EDITS_REQUESTED'  
export function saveEditsRequested () {  
  return { type: SAVE_EDITS_REQUESTED }
}

export const SAVE_EDITS_SUCCEDED = 'SAVE_EDITS_SUCCEDED'  
export function saveEditsSucceded (endpoints, res) {
   return (dispatch, getState) => { 
    res.forEach((r, idx)=>{r.json().then(r=>{
        dispatch(refreshData(endpoints[idx], r[Object.keys(r)[0]]))
      })
    }) 
    dispatch({ type: SAVE_EDITS_SUCCEDED })
   }
}

export const REFRESH_DATA = 'REFRESH_DATA'  
export function refreshData (endpoint, data) {  
  return { type: REFRESH_DATA, endpoint, data }
}

export const SAVE_EDITS_FAILED = 'SAVE_EDITS_FAILED'  
export function saveEditsFailed (err) {  
  return { type: SAVE_EDITS_FAILED, err }
}

export function saveEdits (apiData) {  
  return (dispatch, getState) => {
    dispatch(saveEditsRequested())

    const promises = []
    const endpoints = []

    Object.keys(apiData).forEach(endpoint=>{
      if (!apiData[endpoint].isEndpoint || !apiData[endpoint].edits){ return }
      Object.keys(apiData[endpoint].edits).forEach(id=>{
        promises.push(
          fetch(process.env.REACT_APP_BASEURL+endpoint+'/'+id, {
              method: 'PATCH',
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify(apiData[endpoint].edits[id])
          })
        )
        endpoints.push(endpoint)
      })
    })
    Promise.all(promises)
      .then((res) =>{
        if (res.every(r=>r.ok)){
          dispatch(saveEditsSucceded(endpoints, res))
        }else{
          dispatch(saveEditsFailed("Not all saved"))
        }
      })
      .catch(err=>{
        dispatch(saveEditsFailed(err))
      })
  }

}
   