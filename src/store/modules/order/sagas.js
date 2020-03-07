import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  orderCreateSuccess,
  orderCreateFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

export function* createOrder({ payload }) {
  try {
    const { product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.post, `orders`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(orderCreateSuccess(response.data));
    toast.success('Order successfully created!');
  } catch (err) {
    yield put(orderCreateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* updateOrder({ payload }) {
  try {
    const { id, product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.put, `orders/${id}`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(orderUpdateSuccess(response.data));
    toast.success('Order successfully updated!');
  } catch (err) {
    yield put(orderUpdateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export default all([
  takeLatest('@order/CREATE_REQUEST', createOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
