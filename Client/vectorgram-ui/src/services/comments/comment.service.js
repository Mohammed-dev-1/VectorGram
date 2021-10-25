import axios from 'axios';
import Header from "../users/header.service";

const API = 'http://127.0.0.1:8000/api/comment';
const authorization = {
  headers: {
    'Authorization': Header.authHeader()
  }
}

class CommentService {
  async createComment(content) {
    try {
      const res = await axios
        .post(`${API}/create`, content, authorization);
      
      const message = {
        type: 'SUCCESS',
        message: res.data.message
      }

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.message
      }

      return message;
    }
  }

  async deleteComment(commentId) {
    try {
      const res = await axios
        .delete(`${API}/delete/${commentId}`, authorization)

      const message = {
        type: 'SUCCESS',
        message: res.data.message
      };

      return message;
    }
    catch (error) {
      const message = {
        type: 'DANGER',
        message: 'Something is warning'
      };

      return message;
    }
  }

  async getComments(postId) {
    try {
      const res = await axios
        .get(`${API}/${postId}`, authorization);
      
      const data = res.data.comments;

      return data;
    }
    catch(error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.message
      }

      return message;
    }
  }
}

export default new CommentService();