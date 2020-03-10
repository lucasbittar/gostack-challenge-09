export function deliverymanFetchAllRequest(data) {
  return {
    type: '@deliveryman/FETCH_ALL_REQUEST',
    payload: { ...data },
  };
}

export function deliverymanFetchAllSuccess(data) {
  return {
    type: '@deliveryman/FETCH_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanFetchAllFailure() {
  return {
    type: '@deliveryman/FETCH_ALL_FAILURE',
  };
}

export function deliverymanFetchRequest(id) {
  return {
    type: '@deliveryman/FETCH_REQUEST',
    payload: { id },
  };
}

export function deliverymanFetchSuccess(data) {
  return {
    type: '@deliveryman/FETCH_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanFetchFailure() {
  return {
    type: '@deliveryman/FETCH_FAILURE',
  };
}

export function deliverymanCreateRequest(data) {
  return {
    type: '@deliveryman/CREATE_REQUEST',
    payload: { ...data },
  };
}

export function deliverymanCreateSuccess(data) {
  return {
    type: '@deliveryman/CREATE_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanCreateFailure() {
  return {
    type: '@deliveryman/CREATE_FAILURE',
  };
}

export function deliverymanUpdateRequest(id, data) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { id, ...data },
  };
}

export function deliverymanUpdateSuccess(id, data) {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function deliverymanAvatarUploadRequest(data) {
  return {
    type: '@deliveryman/UPLOAD_AVATAR_REQUEST',
    payload: { data },
  };
}

export function deliverymanAvatarUploadSuccess(data) {
  return {
    type: '@deliveryman/UPLOAD_AVATAR_SUCCESS',
    payload: { data },
  };
}

export function deliverymanUpdateFailure() {
  return {
    type: '@deliveryman/UPDATE_FAILURE',
  };
}

export function deliverymanRemoveRequest(id) {
  return {
    type: '@deliveryman/REMOVE_REQUEST',
    payload: { id },
  };
}

export function deliverymanRemoveSuccess() {
  return {
    type: '@deliveryman/REMOVE_SUCCESS',
  };
}

export function deliverymanRemoveFailure() {
  return {
    type: '@deliveryman/REMOVE_FAILURE',
  };
}

export function deliverymanInputChange(input, value) {
  return {
    type: '@deliveryman/INPUT_CHANGE',
    payload: { input, value },
  };
}

