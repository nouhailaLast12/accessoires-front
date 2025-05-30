import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Ajuste ce chemin selon ta structure

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.createProduct(newProduct);
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Produits</h2>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des produits */}
      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: '15px' }}>
              <strong>{product.name}</strong> - {product.price} €
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ height: '40px', marginLeft: '10px' }}
                />
              )}
              <button
                onClick={() => handleDeleteProduct(product.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;
