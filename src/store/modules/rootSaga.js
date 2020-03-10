import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import deliveryman from './deliveryman/sagas';
import issue from './issue/sagas';
import order from './order/sagas';
import recipient from './recipient/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, user, order, deliveryman, issue, recipient]);
}

