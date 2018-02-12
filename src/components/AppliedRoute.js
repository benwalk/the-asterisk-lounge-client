/*
  AppliedRoute is a Route that applies the provided {childProps} to its
  child Components.
*/
import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;
