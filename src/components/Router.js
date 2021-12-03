import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ga } from '../helpers/analytics';

const Home = lazy(() => import('./Home'));
const NotFound = lazy(() => import('./NotFound'));

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ga(Home)} />
      <Route component={ga(NotFound)} />
    </Switch>
  );
}
