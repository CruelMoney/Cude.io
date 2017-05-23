
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
export function saveEditsSucceded () {  
  return { type: SAVE_EDITS_SUCCEDED }
}

export const SAVE_EDITS_FAILED = 'SAVE_EDITS_FAILED'  
export function saveEditsFailed () {  
  return { type: SAVE_EDITS_FAILED }
}

export function saveEdits (edits) {  
  return (dispatch, getState) => {
    dispatch(saveEditsRequested())

    const promises = []

    
    Object.keys(edits).forEach(e=>{
      promises.push(
        fetch(process.env.REACT_APP_BASEURL+'/api/cases/'+e, {
            method: 'PATCH',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(edits[e])
        })
      )
    })
    Promise.all(promises)
      .then((res) =>{
        if (res.every(r=>r.ok)){
          dispatch(saveEditsSucceded(res.cases))
        }else{
          dispatch(saveEditsFailed())
        }
      })
      .catch(err=>{
        dispatch(saveEditsFailed())
      })
  }

}
   