import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';
import history from '~/services/history';

import {
  deliverymanFetchAllRequest,
  deliverymanFetchAllSuccess,
  deliverymanFetchAllFailure,
  deliverymanFetchSuccess,
  deliverymanFetchFailure,
  deliverymanCreateSuccess,
  deliverymanCreateFailure,
  deliverymanUpdateSuccess,
  deliverymanUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* fetchAllDeliverymen({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'deliverymen', {
      params: { page, q: search !== '' ? search : null },
    });

    yield put(deliverymanFetchAllSuccess(response.data));
    toast.success('Deliverymen successfully loaded!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanFetchAllFailure());
  }
}

export function* fetchDeliveryman({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    yield put(deliverymanFetchSuccess(response.data));
    toast.success('Deliveryman successfully loaded!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanFetchFailure());
    history.push('/deliverymen');
  }
}

export function* removeDeliveryman({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `deliverymen/${id}`);

    toast.success('Deliveryman successfully removed!');
    yield put(closeOverlay());
    yield put(deliverymanFetchAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export function* createDeliveryman({ payload }) {
  try {
    const { name, email, avatar_id } = payload;

    console.tron.log('PAYLOAD', payload);

    const response = yield call(api.post, `deliverymen`, {
      name,
      email,
      avatar_id,
    });

    yield put(deliverymanCreateSuccess(response.data));
    toast.success('Deliveryman successfully created!');
    history.push('/deliverymen');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanCreateFailure());
  }
}

export function* updateDeliveryman({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload;

    const response = yield call(api.put, `deliverymen/${id}`, {
      id,
      name,
      email,
      avatar_id,
    });

    yield put(deliverymanUpdateSuccess(response.data));
    toast.success('Deliveryman successfully updated!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanUpdateFailure());
  }
}

export default all([
  takeLatest('@deliveryman/FETCH_ALL_REQUEST', fetchAllDeliverymen),
  takeLatest('@deliveryman/FETCH_REQUEST', fetchDeliveryman),
  takeLatest('@deliveryman/CREATE_REQUEST', createDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
  takeLatest('@deliveryman/REMOVE_REQUEST', removeDeliveryman),
]);
