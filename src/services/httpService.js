import axios from "axios";
import logger from "./logService";
import { toast } from 'react-toastify';
// import auth from './authService';
//the base url will be replaced with a different value depending whether the app is in development or production
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// we are telling the program whenever you want to send an http request make sure to include this header in the request
//you should reverse this statment to avoid bidirectional dependencies
//axios.defaults.headers.common['x-auth-token'] = auth.getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt){
    // axios.defaults.headers.common['x-auth-token'] = auth.getJwt();
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
