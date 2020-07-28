import axios from 'axios';

const ApiStatus = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};

const BASE_URL = `https://htmlacademy-react-2.appspot.com/guess-melody`;

const createAPI = (onNotAuthorize) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if ([ApiStatus.FORBIDDEN, ApiStatus.UNAUTHORIZED].includes(error.response.status)) {
      onNotAuthorize();
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
