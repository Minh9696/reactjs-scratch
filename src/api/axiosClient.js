import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://api.ezfrontend.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log({response_interceptors: response})

    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log({error_interceptors: error})
    const {config, status, data} = error.response.data;
    const URLs = ['/auth/local/register', '/auth/local']
    if (URLs.includes(config.url) && status === 400) {
        const errList = data.data || [];
        const firstError = errList.length > 0 ? errList[0] : {};
        const msgList = firstError.messages || [];
        const firstMsg = msgList.length > 0 ? msgList[0] : {};
        throw new Error(firstMsg.message);
    };
    return Promise.reject(error);
  });

export default axiosClient;