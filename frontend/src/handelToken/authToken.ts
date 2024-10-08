// import axios from 'axios';
// import { store } from '../store/store';
// import { signIn } from '../slice/authSlice';

// axios.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken') || ''; // Ensure refreshToken is a string
//       const response = await axios.post('/api/auth/refresh-token', { refreshToken });
//       const { accessToken } = response.data;
//       store.dispatch(signIn({ accessToken, refreshToken }));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );