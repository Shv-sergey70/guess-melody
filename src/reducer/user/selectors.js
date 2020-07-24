import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.USER;

const getAuthorization = (state) => state[NAMESPACE].isAuthorizationRequired;

export {
  getAuthorization
};
