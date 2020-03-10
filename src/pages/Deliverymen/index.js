import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wrapper from '~/components/Wrapper';

import DeliverymenList from '~/pages/DeliverymenList';
import DeliverymanForm from '~/pages/DeliverymanForm';

export default function Orders({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={DeliverymenList} />
        <Route
          path={`${url}/edit/:deliveryman_id`}
          component={DeliverymanForm}
        />
        <Route path={`${url}/create`} component={DeliverymanForm} />
      </Switch>
    </Wrapper>
  );
}
