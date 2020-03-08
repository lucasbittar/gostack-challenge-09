import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

import {
  orderFetchAllSuccess,
  orderFetchAllFailure,
  orderFetchSuccess,
  orderFetchFailure,
  orderCreateSuccess,
  orderCreateFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

export function* fetchAllOrders({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'orders', {
      params: { page, search: search !== '' ? search : null },
    });

    yield put(orderFetchAllSuccess(response.data));
    toast.success('Orders successfully loaded!');
  } catch (err) {
    yield put(orderFetchAllFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* fetchOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `orders/${id}`);

    yield put(orderFetchSuccess(response.data));
    toast.success('Order successfully loaded!');
  } catch (err) {
    yield put(orderFetchFailure());
    history.push('/orders');
    toast.error('Order not found.');
  }
}

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
  takeLatest('@order/FETCH_ALL_REQUEST', fetchAllOrders),
  takeLatest('@order/FETCH_REQUEST', fetchOrder),
  takeLatest('@order/CREATE_REQUEST', createOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
