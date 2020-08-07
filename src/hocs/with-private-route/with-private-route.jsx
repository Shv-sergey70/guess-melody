import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Route from '../../routes';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    if (Object.keys(props.user).length === 0) {
      return <Redirect to={Route.AUTH} />;
    }

    return (
      <Component {...props}/>
    );
  };

  WithPrivateRoute.propTypes = {
    user: PropTypes.object
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
