import { Request, Response, NextFunction } from 'express';
import { Product, IProduct } from '../models/Product';

// Get all products for a user
export const getUserProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    
    const products = await Product.find({ userId });
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// Get a single product
export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    
    const product = await Product.findOne({ id, userId });
    
    if (!product) {
      res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      product
    });
  } catch (error) {
    next(error);
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const userId = (req as any).userId;
    
    const productData: IProduct = {
      name,
      description,
      price,
      userId
    };
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      status: 'success',
      product
    });
  } catch (error) {
    next(error);
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const userId = (req as any).userId;
    
    const product = await Product.findOneAndUpdate(
      { _id: id, userId },
      { name, description, price }
    );
    
    if (!product) {
      res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      product
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    
    const product = await Product.findOneAndDelete({ _id: id, userId });
    
    if (!product) {
      res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
      return;
    }
    
    console.log("Delete operation successful");

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error("Error in delete operation:", error);
    next(error);
  }
};