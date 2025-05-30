import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #3e2723;
  color: white;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-right: 10px;
  background-color: ${(props) => (props.delete ? '#e53935' : '#3e2723')};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => (props.delete ? '#c62828' : '#5d4037')};
  }
`;

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/products/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to delete product", err);
//     }
//   };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/products', newProduct);
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <Container>
      <Title>Admin Dashboard</Title>

      <ProductTable>
        <TableHead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            {/* <th>Actions</th> */}
          </tr>
        </TableHead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <img src={product.image} alt={product.name} width="60" />
              </TableCell>
             
            </tr>
          ))}
        </tbody>
      </ProductTable>

    </Container>
  );
};

export default AdminDashboard;
