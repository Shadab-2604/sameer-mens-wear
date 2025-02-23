import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Suits',
    description: '',
    price: 0,
    image: null as File | null
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password
      });
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      fetchProducts();
    } catch (error) {
      alert('Login failed');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price.toString());
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        category: 'Suits',
        description: '',
        price: 0,
        image: null
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-serif mb-6 text-center">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </button>
        </div>

        {isAddingProduct && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-serif mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Suits">Suits</option>
                  <option value="Sherwani">Sherwani</option>
                  <option value="Kurta">Kurta</option>
                  <option value="Sadri Coat">Sadri Coat</option>
                  <option value="Blazer">Blazer</option>
                  <option value="Jodhpuri">Jodhpuri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files?.[0] || null })}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.category}</p>
                <p className="text-primary font-semibold mb-4">₹{product.price}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}