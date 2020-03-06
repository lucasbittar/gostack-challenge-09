import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wrapper from '~/components/Wrapper';

import OrdersList from '~/pages/OrdersList';
import OrderEdit from '~/pages/OrderEdit';

export default function Orders({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={OrdersList} />
        <Route path={`${url}/edit/:order_id`} component={OrderEdit} />
        <Route path={`${url}/create`} component={OrderEdit} />
      </Switch>
    </Wrapper>
  );
}
