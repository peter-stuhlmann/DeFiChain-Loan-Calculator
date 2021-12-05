import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import useGoogleAnalytics from '../helpers/useGoogleAnalytics';

const Home = lazy(() => import('./Home'));
const NotFound = lazy(() => import('./NotFound'));

export default function Router() {
  useGoogleAnalytics();

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
