import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryman from './deliveryman/reducer';
import order from './order/reducer';
import overlay from './overlay/reducer';
import recipient from './recipient/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  deliveryman,
  order,
  overlay,
  recipient,
  user,
});
