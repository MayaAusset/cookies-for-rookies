import axios from "axios";

class NodemailerService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, 
    });
  }

  sendMail = (data) => {
    return this.service
      .post('/api/forma', data)
      .then((response) => response);
  };
}

export default NodemailerService