import * as React from 'react';
import { Route, Switch } from 'react-router';
import Main from 'app/containers/app';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Main} />
  </Switch>
));
