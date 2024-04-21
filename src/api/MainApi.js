import axios from "axios";

export function refreshToken() {
  // Get the refresh token from local storage
  const refreshToken = localStorage.getItem('refresh_token');
  console.log("refresh token: ", refreshToken);
  return axios.post(`http://localhost:8000/api/v1/auth/api/token/refresh/`, {
    refresh: refreshToken
  })
  .then(response => {
    // The server should return a new access token    
    console.log("response from refresh token", response.data);
    if (response.data.access) {
      // Save the new access token in local storage
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } else {
      throw new Error('No access token returned');
    }
  })
  .catch(error => {
    // Handle the error
    console.error('Error refreshing token', error);
    if(error.response && error.response.status === 401){
        //Redirecting to login page
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
    }
    throw error;
  });
}
