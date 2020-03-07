export function orderCreateRequest(data) {
  return {
    type: '@order/CREATE_REQUEST',
    payload: { ...data },
  };
}

export function orderCreateSuccess(data) {
  return {
    type: '@order/CREATE_SUCCESS',
    payload: { ...data },
  };
}

export function orderCreateFailure() {
  return {
    type: '@order/CREATE_FAILURE',
  };
}
export function orderUpdateRequest(id, data) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { id, ...data },
  };
}

export function orderUpdateSuccess(id, data) {
  return {
    type: '@order/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function orderUpdateFailure() {
  return {
    type: '@order/UPDATE_FAILURE',
  };
}
