export function issueFetchAllRequest(data) {
  return {
    type: '@issue/FETCH_ALL_REQUEST',
    payload: { ...data },
  };
}

export function issueFetchAllSuccess(data) {
  return {
    type: '@issue/FETCH_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function issueFetchAllFailure() {
  return {
    type: '@issue/FETCH_ALL_FAILURE',
  };
}

export function issueCancelOrderRequest(id) {
  return {
    type: '@issue/CANCEL_ORDER_REQUEST',
    payload: { id },
  };
}

export function issueCancelOrderSuccess() {
  return {
    type: '@issue/CANCEL_ORDER_SUCCESS',
  };
}

export function issueCancelOrderFailure() {
  return {
    type: '@issue/CANCEL_ORDER_FAILURE',
  };
}
