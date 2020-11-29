import 'Assets/stylesheets/main.scss';

import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CommonLayout from 'Components/Layout';

// const CompName = lazy(() => import('{componentPath}'))
const NotFound = lazy(() => import('Pages/NotFound'));
const HomePage = lazy(() => import('Pages/HomePage'));

export default function RootRouter() {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <CommonLayout>
          <Route exact path="/" component={HomePage} />
        </CommonLayout>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
