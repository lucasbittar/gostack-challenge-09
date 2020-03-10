export function recipientFetchAllRequest(data) {
  return {
    type: '@recipient/FETCH_ALL_REQUEST',
    payload: { ...data },
  };
}

export function recipientFetchAllSuccess(data) {
  return {
    type: '@recipient/FETCH_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function recipientFetchAllFailure() {
  return {
    type: '@recipient/FETCH_ALL_FAILURE',
  };
}

export function recipientFetchRequest(id) {
  return {
    type: '@recipient/FETCH_REQUEST',
    payload: { id },
  };
}

export function recipientFetchSuccess(data) {
  return {
    type: '@recipient/FETCH_SUCCESS',
    payload: { ...data },
  };
}

export function recipientFetchFailure() {
  return {
    type: '@recipient/FETCH_FAILURE',
  };
}

export function recipientCreateRequest(data) {
  return {
    type: '@recipient/CREATE_REQUEST',
    payload: { data },
  };
}

export function recipientCreateSuccess(data) {
  return {
    type: '@recipient/CREATE_SUCCESS',
    payload: { data },
  };
}

export function recipientCreateFailure() {
  return {
    type: '@recipient/CREATE_FAILURE',
  };
}

export function recipientUpdateRequest(id, data) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function recipientUpdateSuccess(id, data) {
  return {
    type: '@recipient/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function recipientUpdateFailure() {
  return {
    type: '@recipient/UPDATE_FAILURE',
  };
}

export function recipientRemoveRequest(id) {
  return {
    type: '@recipient/REMOVE_REQUEST',
    payload: { id },
  };
}

export function recipientRemoveSuccess() {
  return {
    type: '@recipient/REMOVE_SUCCESS',
  };
}

export function recipientRemoveFailure() {
  return {
    type: '@recipient/REMOVE_FAILURE',
  };
}

export function recipientInputChange(input, value) {
  return {
    type: '@recipient/INPUT_CHANGE',
    payload: { input, value },
  };
}

