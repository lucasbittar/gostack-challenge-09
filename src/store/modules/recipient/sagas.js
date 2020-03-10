import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

import {
  recipientFetchAllRequest,
  recipientFetchAllSuccess,
  recipientFetchAllFailure,
  recipientFetchSuccess,
  recipientFetchFailure,
  recipientCreateSuccess,
  recipientCreateFailure,
  recipientUpdateSuccess,
  recipientUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* fetchAllRecipients({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'recipients', {
      params: { page, search: search !== '' ? search : null },
    });

    yield put(recipientFetchAllSuccess(response.data));
    toast.success('Recipients successfully loaded!');
  } catch (err) {
    yield put(recipientFetchAllFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* fetchRecipient({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `recipients/${id}`);

    yield put(recipientFetchSuccess(response.data));
    toast.success('Recipient successfully loaded!');
  } catch (err) {
    yield put(recipientFetchFailure());
    history.push('/recipients');
    toast.error('Recipient not found.');
  }
}

export function* removeRecipient({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `recipients/${id}`);

    toast.success('Recipient successfully removed!');
    yield put(closeOverlay());
    yield put(recipientFetchAllRequest());
  } catch (err) {
    toast.error('Something went wrong. Please try again');
  }
}

export function* createRecipient({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, `recipients`, data);

    yield put(recipientCreateSuccess(response.data));
    toast.success('Recipient successfully created!');
  } catch (err) {
    yield put(recipientCreateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export function* updateRecipient({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `recipients/${id}`, data);

    yield put(recipientUpdateSuccess(response.data));
    toast.success('Recipient successfully updated!');
  } catch (err) {
    yield put(recipientUpdateFailure());
    toast.error('Something went wrong. Please try again.');
  }
}

export default all([
  takeLatest('@recipient/FETCH_ALL_REQUEST', fetchAllRecipients),
  takeLatest('@recipient/FETCH_REQUEST', fetchRecipient),
  takeLatest('@recipient/CREATE_REQUEST', createRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipient),
  takeLatest('@recipient/REMOVE_REQUEST', removeRecipient),
]);
