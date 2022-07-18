import Axios, {AxiosResponse} from 'axios';
import {
  DbConcurrencyError,
  ErrorResponse,
  InternalServerError,
} from '../dto/error';

Axios.interceptors.response.use(
  (response: AxiosResponse<unknown>) => response,
  ({response}: {response: AxiosResponse<string>}) => {
    if (response.status === 409) {
      return Promise.reject(
        new DbConcurrencyError(response.data, response.status)
      );
    }

    if (response.status === 500) {
      return Promise.reject(
        new InternalServerError(response.data, response.status)
      );
    }

    return new ErrorResponse(response.data, response.status);
  }
);
