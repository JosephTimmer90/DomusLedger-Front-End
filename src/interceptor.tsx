import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('The request was intercepted!')
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('There was an error with the request.')
    return Promise.reject(error);
  }
);