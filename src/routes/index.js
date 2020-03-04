import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';

import Deliverymen from '~/pages/Deliverymen';
import Issues from '~/pages/Issues';
import Orders from '~/pages/Orders';
import Recipients from '~/pages/Recipients';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/issues" component={Issues} isPrivate />
      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
    </Switch>
  );
}
