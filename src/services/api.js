import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  // 📦 Produits
  getAllProducts() {
    return api.get('/products');
  },
  
  getProduct(id) {
    return api.get(`/products/${id}`);
  },

  createProduct(productData) {
    return api.post('/products', productData);
  },

  updateProduct(id, updatedData) {
    return api.put(`/products/${id}`, updatedData);
  },

  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
};
