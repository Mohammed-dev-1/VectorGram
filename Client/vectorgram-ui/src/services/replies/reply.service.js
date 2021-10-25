import Header from "../users/header.service";
import axios from 'axios';

const API = 'http://127.0.0.1:8000/api/reply';
const authorization = {
  headers: {
    'Authorization': Header.authHeader()
  }
}

class ReplyService {
  async createReply(reply) {
    try {
      const res = await axios
        .post(`${API}/create`, reply, authorization)

      const message = {
        type: 'SUCCESS',
        message: res.data.message
      };

      return message;
    } 
    catch (error) {
      const message = {
        type: 'DANGER',
        message: 'Something was warning'
      };

      return message;
    }
  }

  async deleteReply(id) {
    try{
      const res = await axios
        .delete(`${API}/delete/${id}`, authorization);
        
      const message = {
        type: 'SUCCESS',
        message: res.data.message
      };

      return message;
    }
    catch(err) {
      console.log(err);

      const message = {
        type: 'DANGER',
        message: 'Something was warning'
      };

      return message;
    }
  }

  async getReplies(commentId) {
    try {
      const res = await axios
        .get(`${API}/${commentId}`, authorization)  
      
      const replies = res.data.replies;

      return replies;
    }
    catch (error) {
      const message = {
        type: 'DANGER',
        message: error.response?.data.message
      };

      return message;
    }
  }
}


export default new ReplyService();