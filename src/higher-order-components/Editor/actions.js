
export const REGISTER_EDITS = 'REGISTER_EDITS'  
export function registerEdits (endpoint, id, edits) {  
  return { type: REGISTER_EDITS, endpoint, id, edits }
}
