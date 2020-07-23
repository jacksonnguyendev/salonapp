import axios from 'axios';
import {get} from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

import {CONFIGS} from '../../../constants';
import {translate} from '../../../core';

export const axiosClient = axios.create({
  baseURL: CONFIGS.apiUrl,
  timeout: 10000,
  headers: {},
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function(config) {
    const accessToken = await AsyncStorage.getItem(
      CONFIGS.storeKeys.accessToken,
    );

    // added token
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function(error) {
    // handle UnAuthorized
    if (
      get(error, 'response.data.statusCode', 9999) === 401 &&
      !get(error, 'response.data', undefined)
    ) {
      error.response.data = 'UnAuthorized';

      // refresh token
      const originalRequest = error.config;
      if (
        !originalRequest._retry &&
        !originalRequest.url.includes('/Auth/token/refresh')
      ) {
        //Only retry once a request
        originalRequest._retry = true;

        try {
          const accessToken = await AsyncStorage.getItem(
            CONFIGS.storeKeys.accessToken,
          );
          const refreshToken = await AsyncStorage.getItem(
            CONFIGS.storeKeys.refreshToken,
          );
          // get new tokens
          const result = await axiosClient.post('/Auth/token/refresh', {
            token: accessToken,
            refreshToken,
          });

          // set new tokens
          await AsyncStorage.multiSet([
            [CONFIGS.storeKeys.accessToken, result.data.accessToken],
            [CONFIGS.storeKeys.refreshToken, result.data.refreshToken],
          ]);

          // recall the original request if there is
          return axiosClient(originalRequest);
        } catch (e) {}
      }
    }

    // server is down
    if (
      get(error, 'response.data.statusCode', 9999) === 500 ||
      get(error, 'message', '').includes('status code 500')
    ) {
      return Promise.reject({
        response: {data: translate('errors.SERVER_MAINTINANCE')},
      });
    }

    if (!error.response) {
      return Promise.reject({response: {data: error.message}});
    }

    return Promise.reject(error);
  },
);
