import React from 'react';
import { Switch, Redirect, HashRouter } from 'react-router-dom';
import  RouteWithLayout  from './components/Common/RouteWithLayout/RouteWithLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import MainLayout from './Layouts/MainLayout';



const Routes = () => {
  return (
    <HashRouter
      getUserConfirmation={(message, callback) => {
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <Switch>
        <Redirect exact from="/" to="/login" />
        <RouteWithLayout
          component={Dashboard}
          exact
          layout={MainLayout}
          path="/dashboard"
          protectedRoute
        />
        <RouteWithLayout
          component={Login}
          exact
          layout={MainLayout}
          path="/login"
        />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
