import axios from 'axios';
import Header from "../users/header.service";

const API = 'http://127.0.0.1:8000/api/profile';
const authorization = {
  headers: {
    'Authorization': Header.authHeader()
  }
}
const config = {
  headers: {
    'Authorization': Header.authHeader(),
    'Content-Type': 'multipart/form-data',
  }
}


class ProfileService {
  async follow(uid) {
    try {
      const res = await axios
        .get(`${API}/follow/${uid}`, authorization)  
      

      const message = {
        type: res.data.status ? 'SUCCESS' : 'WARNING',
        message: res.data.message,
        status: res.data.status
      }

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.data.message
      }

      return message;
    }
  }
  getProfile(uid) {
    return axios
      .get(`${API}/${uid}`)
      .then(
        res => {
          /**
           * Check if the profile has the same id of user, 
           * then set them in local storage.
           *
           * if not ? return profile data without store in local storage. 
           */
 
          if(Header.userId() == res.data.user_id) {
            localStorage.setItem('profile', JSON.stringify(res.data));
          }
          
          return res.data;
        },
        err => {
          const message = {
            type: 'DANGER',
            message: err.data.message
          }
    
          return message;    
        }
      ) 
  }
  async changeProfileImage(image) {
    try {
      const res = await axios
        .post(`${API}/change/image`, image, config);

      const message = await res.data.message;
      const avatar = await res.data.avatar;

      /**
       * change avatar from localStorage
       */
      if(localStorage.getItem('profile')) {
        const profile = JSON.parse(localStorage.getItem('profile'))
        
        profile.avatar = avatar
        localStorage.removeItem('profile')
        localStorage.setItem('profile', JSON.stringify(profile))
      }

      const data = {
        type: 'SUCCESS',
        message: message,
        avatar: avatar
      }

      return data;
    }
    catch(err) {
      console.log(err);
      const errMessage = await err.response?.data.message;

      const message = {
        type: 'DANGER',
        message: errMessage
      }

      return message;
    }
  }

  async getProfileImage(id=Header.userId()) {
    try {
      const res = await axios
        .get(`${API}/${id}`, authorization)
      
      const image = await res.data.avatar;

      return image;
    }
    catch(err) {
      console.log('get image error : ',err);
    }
  }

  updateBio(data) {
    return axios
      .post(`${API}/update`,  data, authorization)
      .then(
        res => {
          console.log('res form update profile: ', res.data.message)
          const message = {
            type: 'SUCCESS',
            message: res.data.message
          };

          return message;
        },
        err => {
          console.log(err);
        }
      )
  }

  async searchProfile(user) {
    try{
      const res = await axios
        .post(`${API}/search`, user, authorization);

      console.log(res.data); 
      const data = await res.data.profiles
      
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
}


export default new ProfileService();