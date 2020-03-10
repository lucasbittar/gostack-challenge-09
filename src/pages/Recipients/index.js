import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wrapper from '~/components/Wrapper';

import RecipientsList from '~/pages/RecipientsList';
import RecipientForm from '~/pages/RecipientForm';

export default function Orders({ match }) {
  const { url } = match;
  return (
    <Wrapper>
      <Switch>
        <Route path={`${url}`} exact component={RecipientsList} />
        <Route path={`${url}/edit/:recipient_id`} component={RecipientForm} />
        <Route path={`${url}/create`} component={RecipientForm} />
      </Switch>
    </Wrapper>
  );
}
