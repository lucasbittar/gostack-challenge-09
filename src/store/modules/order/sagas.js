import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';
import history from '~/services/history';

import {
  orderFetchAllRequest,
  orderFetchAllSuccess,
  orderFetchAllFailure,
  orderFetchSuccess,
  orderFetchFailure,
  orderCreateSuccess,
  orderCreateFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* fetchAllOrders({ payload }) {
  try {
    const { page, search, withIssues } = payload;

    const response = yield call(api.get, 'orders', {
      params: {
        page,
        q: search !== '' ? search : null,
        withIssues: withIssues || null,
      },
    });

    yield put(orderFetchAllSuccess(response.data));
    toast.success('Orders successfully loaded!');
  } catch (err) {
    errorHandling(err);
    yield put(orderFetchAllFailure());
  }
}

export function* fetchOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `orders/${id}`);

    yield put(orderFetchSuccess(response.data));
    toast.success('Order successfully loaded!');
  } catch (err) {
    errorHandling(err);
    yield put(orderFetchFailure());
    history.push('/orders');
  }
}

export function* removeOrder({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `orders/${id}`);

    toast.success('Order successfully removed!');
    yield put(closeOverlay());
    yield put(orderFetchAllRequest());
  } catch (err) {
    errorHandling(err);
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
    history.push('/orders');
  } catch (err) {
    errorHandling(err);
    yield put(orderCreateFailure());
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
    errorHandling(err);
    yield put(orderUpdateFailure());
  }
}

export default all([
  takeLatest('@order/FETCH_ALL_REQUEST', fetchAllOrders),
  takeLatest('@order/FETCH_REQUEST', fetchOrder),
  takeLatest('@order/CREATE_REQUEST', createOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
  takeLatest('@order/REMOVE_REQUEST', removeOrder),
]);
