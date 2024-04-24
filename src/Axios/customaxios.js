import axios from "axios";
import { refreshToken } from "../api/MainApi";


const instanceurl = "http://localhost:8000/"
//api/account/login/
const axiosInstance = axios.create({
    baseURL: instanceurl,    
});


axiosInstance.interceptors.request.use((request)=>{
    //request.headers['Accept'] = 'application/json';
    console.log("request sent to backend", request);
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      request.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return request;
},(error)=>{
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response)=>{
    console.log("got response from backend");
    return response;
},(error)=>{
    console.log("error from backend:<< ", error['response']);
    console.log("error from backend:>> ", error.response.data.code);
    /* console.log("Message: ", error.response.data.detail)
    console.log("Error msg: ", error.message.message) */
    /* if(error['response']){
        if(error.response.data.code === 'token_not_valid' && error['response']['status'] === 401 && error.response.data.detail === 'Given token not valid for any token type'){
            console.log("Unauthorized User, Login again");
            //TODO: redirect to login page
        }
    } */
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && error.response.data.code === 'token_not_valid' && error.response.data.detail === 'Given token not valid for any token type') {
      originalRequest._retry = true;
      console.log("Unauthorized User, Login again");
      // You can use a function to refresh the token here, then retry the original request
      return refreshToken().then(res => {
        console.log("res from refresh token:>>>>>> ", res);
        if (res.status === 200) {
          // Update the token in localStorage
          localStorage.setItem('access_token', res.data.access_token);
          // Update the token in the original request and retry it
          originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token;
          return instance(originalRequest);
        }
      });
    }
    console.log(error.message);
    return Promise.reject(error);
})

export default axiosInstance; 