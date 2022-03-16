import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/projects
  createOne = (resource, requestBody) => {
    return this.api.post(`/${resource}`, requestBody);
  };

  // GET /api/projects
  getAll = (resource) => {
    return this.api.get(`/${resource}`);
  };

  // GET /api/projects/:id
  getOne = (resource, id) => {
    return this.api.get(`/${resource}/${id}`);
  };

  // PUT /api/projects/:id
  updateOne = (resource, id, requestBody) => {
    return this.api.put(`/${resource}/${id}`, requestBody);
  };

  // DELETE /api/projects/:id
  deleteOne = (resource, id) => {
    return this.api.delete(`/${resource}/${id}`);
  };
}

// Create one instance (object) of the service
const apiService = new ApiService();

export default apiService;


// invoke with apiService.getOne("users", id)