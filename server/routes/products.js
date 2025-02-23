import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new product (protected route)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
      folder: 'sameer-menswear'
    });

    const product = new Product({
      name,
      category,
      description,
      price,
      image: result.secure_url
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (protected route)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const updateData = { name, category, description, price };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
        folder: 'sameer-menswear'
      });
      updateData.image = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;