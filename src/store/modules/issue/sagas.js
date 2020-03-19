import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';

import {
  issueFetchAllRequest,
  issueFetchAllSuccess,
  issueFetchAllFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* fetchAllIssues({ payload }) {
  try {
    const { page = 1, withIssues = true } = payload;

    const response = yield call(api.get, 'orders', {
      params: { page, withIssues },
    });

    yield put(issueFetchAllSuccess(response.data));
    toast.success('Issues successfully loaded!');
  } catch (err) {
    errorHandling(err);
    yield put(issueFetchAllFailure());
  }
}

export function* cancelOrder({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `issue/${id}/cancel-order`);

    toast.success('Order successfully canceled!');
    yield put(closeOverlay());
    yield put(issueFetchAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export default all([
  takeLatest('@issue/FETCH_ALL_REQUEST', fetchAllIssues),
  takeLatest('@issue/CANCEL_ORDER_REQUEST', cancelOrder),
]);
