export const CASE_OPENED = 'CASE_OPENED'  
export function caseOpened (theCase) { 
  return { type: CASE_OPENED, theCase }
}

export const CASE_CLOSED = 'CASE_CLOSED'  
export function caseClosed () { 
  return { type: CASE_CLOSED }
}

