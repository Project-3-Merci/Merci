import axios from "axios";

class CloudinaryService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

    uploadImage = (file) => {
        return this.api.post("/upload", file).then(res => res.data)
    };

}

const cloudinaryService = new CloudinaryService();

export default cloudinaryService;