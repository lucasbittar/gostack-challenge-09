import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

import {
  deliverymanFetchAllSuccess,
  deliverymanFetchAllFailure,
  deliverymanFetchSuccess,
  deliverymanFetchFailure,
  deliverymanCreateSuccess,
  deliverymanCreateFailure,
  deliverymanUpdateSuccess,
  deliverymanUpdateFailure,
} from './actions';

export function* fetchAllDeliverymen({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'deliverymen', {
      params: { page, search: search !== '' ? search : null },
    });

    yield put(deliverymanFetchAllSuccess(response.data));
    toast.success('Deliverymen successfully loaded!');
  } catch (err) {
    yield put(deliverymanFetchAllFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* fetchDeliveryman({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    yield put(deliverymanFetchSuccess(response.data));
    toast.success('Deliveryman successfully loaded!');
  } catch (err) {
    yield put(deliverymanFetchFailure());
    history.push('/deliverymen');
    toast.error('Deliveryman not found.');
  }
}

export function* createDeliveryman({ payload }) {
  try {
    const { product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.post, `deliverymen`, {
      deliveryman_id,
      recipient_id,
      product,
    });

    yield put(deliverymanCreateSuccess(response.data));
    toast.success('deliveryman successfully created!');
  } catch (err) {
    yield put(deliverymanCreateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* updateDeliveryman({ payload }) {
  try {
    const { id, product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.put, `deliverymen/${id}`, {
      deliveryman_id,
      recipient_id,
      product,
    });

    yield put(deliverymanUpdateSuccess(response.data));
    toast.success('Deliveryman successfully updated!');
  } catch (err) {
    yield put(deliverymanUpdateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export default all([
  takeLatest('@deliveryman/FETCH_ALL_REQUEST', fetchAllDeliverymen),
  takeLatest('@deliveryman/FETCH_REQUEST', fetchDeliveryman),
  takeLatest('@deliveryman/CREATE_REQUEST', createDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
]);
