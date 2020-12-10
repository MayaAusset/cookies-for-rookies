import axios from "axios";

class RecipeService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  createRecipe = (data) => {
    return this.service
      .post("/api/recipe", data)
      .then((response) => response);
  };

  getRecipes = () => {
    return this.service.get("/api/recipes").then((response) => response);
  };

  getOneRecipe = (id) => {
    return this.service.get(`/api/recipes/${id}`).then((response) => response);
  };

  updateRecipe = (id, data) => {
    return this.service
      .put(`/api/recipes/${id}`, data)
      .then((response) => response);
  };

  removeRecipe = (id) => {
    return this.service
      .delete(`/api/recipes/${id}`)
      .then((response) => response);
  };
}

export default RecipeService;
