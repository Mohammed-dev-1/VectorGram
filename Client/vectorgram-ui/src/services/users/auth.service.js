import axios from 'axios';

// Base API for all request
const API = 'http://127.0.0.1:8000/api/user';

class AuthService {
  register(user) {
    return axios
      .post(`${API}/register`, user)
      .then(
        res => {          
          // Set a user data on localStorage
          localStorage.setItem('user', JSON.stringify(res.data));
          
          // custom response 
          const user = {
            type: 'SUCCESS',
            message: `${res.data.username} welcome to your comunity`,
            data: res.data
          };
          
          return user;
        },
        err => {
          const message = {
            type: 'DANGER',
            message: err.response?.data.errors.email[0]||err.response?.data.errors.username[0]
          }

          return message;
        }
      )
  }
  login(user) {
    return axios
      .post(`${API}/login`, user)
      .then(
        res => {
          // Set a user data on localStorage          
          localStorage.setItem('user', JSON.stringify(res.data));
          
          // custom response
          const user = {
            type: 'SUCCESS',
            message: `${res.data.username} welcome back!`,
            data: res.data
          };
          
          return user;
        },
        err => {
          const message = {
            type: 'DANGER',
            message: err.response?.data.message
          }

          return message;
        }
      )
  }
  logout() {
    return new Promise((resolve,reject)=> {
      // Remove user from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      
      const message = {
        type: 'WARNING',
        message: 'Have nice day (:'
      }

      resolve(message);
      reject('error');
    }) 
  }
}


export default new AuthService();