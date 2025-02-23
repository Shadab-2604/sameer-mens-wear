import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          category === 'all'
            ? `${import.meta.env.VITE_API_URL}/products`
            : `${import.meta.env.VITE_API_URL}/products/category/${category}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-8 text-center">
          {category === 'all' ? 'All Collections' : category}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-2">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-primary">₹{product.price}</span>
                  <a
                    href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name} (${product.category})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}