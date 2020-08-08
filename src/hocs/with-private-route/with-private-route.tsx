import * as React from 'react';
import {Redirect} from 'react-router-dom';
import Route from '../../routes';
import {User} from '../../types';
import {Component} from "react";
import {Subtract} from "utility-types";

interface InjectedProps {
  user: User | {}
}

const withPrivateRoute = (Component) => {
  type Props = React.ComponentProps<typeof Component>

  type ActualProps = Subtract<Props, InjectedProps>

  const WithPrivateRoute: React.FunctionComponent<ActualProps> = (props) => {
    if (Object.keys(props.user).length === 0) {
      return <Redirect to={Route.AUTH} />;
    }

    return (
      <Component {...props}/>
    );
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
