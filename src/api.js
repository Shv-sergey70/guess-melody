import axios from 'axios';
import {ActionCreator} from "./reducer/reducer";

const ApiStatus = {
  FORBIDDEN: 403
};

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === ApiStatus.FORBIDDEN) {
      dispatch(ActionCreator.requireAuthorization(true));
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
