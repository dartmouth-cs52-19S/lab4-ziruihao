// ActionTypes, just for convenience of String references

export const ActionTypes = {
  MAKE_POST: 'MAKE_POST',
  REMOVE_POST: 'REMOVE_POST',
};

export function makePost() {
  return {
    type: ActionTypes.MAKE_POST,
    payload: null,
  };
}

export function removePost() {
  return {
    type: ActionTypes.REMOVE_POST,
    payload: null,
  };
}
