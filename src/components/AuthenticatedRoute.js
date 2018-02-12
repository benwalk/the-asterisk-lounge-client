/*
  AuthenticatedRoute is a Route that will check if the user is logged in
  before routing. User is redirected to login page if not authenticated.
*/
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated ?
        <C {...props} {...cProps} />
        :
        <Redirect
          to={`/login?redirect=${props.location.pathname}${props.location
            .search}`}
        />
      }
  />;
