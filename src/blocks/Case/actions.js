
export const REGISTER_EDITS = 'REGISTER_EDITS'  
export function registerEdits (id, edits) {  
  return { type: REGISTER_EDITS, id, edits }
}
