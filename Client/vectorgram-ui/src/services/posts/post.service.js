import axios from 'axios';
import Header from '../users/header.service';

const API = 'http://127.0.0.1:8000/api/post';
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

class PostService {
  async getAllPosts() {
    try {
      const res = await axios
        .get(`${API}/all`, authorization);

      const data = res.data.posts;

      return data;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.message
      };

      return message;
    }
  }
  async getProfilePosts(uid) {
    try {
      const res = await axios
        .get(`${API}/user/${uid}`, authorization);

      const data = res.data.posts;

      return data;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.message
      };

      return message;
    }
  }

  getPostContent(id) {
    return axios
      .get(`${API}/${id}`, authorization)
      .then(
        res => {
          return res.data;
        },
        err => {          
          const message = {
            type: 'DANGER',
            message: err.response?.data.message
          };

          return message;
        }
      )
  }

  async createPost(post) {
    try {
      const res = await axios
        .post(`${API}/create`, post, config);
      
      const message = {
        type: 'SUCCESS',
        message: res.data.message
      }

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.errors.post_image[0]
      }

      return message;
    }
  }

  async updatePost(post,id) {
    try {
      const res = await axios
        .post(`${API}/update/${id}`, post, config);
      
      const message = {
        type: 'SUCCESS',
        message: res.data.message
      }

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.errors
      }

      return message;
    }
  }

  async deletePost(id) {
    try {
      const res = await axios
        .delete(`${API}/delete/${id}`, authorization)

      const message = {
        type: 'SUCCESS',
        message: res.data.message
      };

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: 'Something is warning!'
      }

      return message;
    }
  }
}

export default new PostService();