import { db } from '../config/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  userId: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}

export class Product {
  private static collection = 'products';

  static async find(query: Partial<IProduct>): Promise<IProduct[]> {
    try {
      const productsRef = db.collection(this.collection);
      
      // Create the query - don't assign to a variable yet
      let firestoreQuery: FirebaseFirestore.Query | FirebaseFirestore.CollectionReference = productsRef;
      
      // Apply conditions to the query
      if (query.userId) {
        firestoreQuery = firestoreQuery.where('userId', '==', query.userId);
      }
      
      // Now execute the query
      const snapshot = await firestoreQuery.get();
      
      if (snapshot.empty) {
        return [];
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IProduct[];
    } catch (error) {
      console.error('Error finding products:', error);
      return [];
    }
  }

  static async findOne(query: Partial<IProduct>): Promise<IProduct | null> {
    try {
      const productsRef = db.collection(this.collection);
      
      // Add where conditions based on query
      if (query.id && query.userId) {
        const docRef = productsRef.doc(query.id);
        const doc = await docRef.get();
        
        if (!doc.exists) {
          return null;
        }
        
        const data = doc.data() as IProduct;
        
        // Check if this product belongs to the user
        if (data.userId !== query.userId) {
          return null;
        }
        
        return {
          id: doc.id,
          ...data
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error finding product:', error);
      return null;
    }
  }

  static async create(productData: IProduct): Promise<IProduct> {
    const newProduct = {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await db.collection(this.collection).add(newProduct);
    
    return {
      id: docRef.id,
      ...newProduct
    };
  }

  static async findOneAndUpdate(query: { _id: string; userId: string }, updateData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      const docRef = db.collection(this.collection).doc(query._id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      const data = doc.data() as IProduct;
      
      // Check if this product belongs to the user
      if (data.userId !== query.userId) {
        return null;
      }
      
      const updatedData = {
        ...updateData,
        updatedAt: Timestamp.now()
      };
      
      await docRef.update(updatedData);
      
      return {
        id: doc.id,
        ...data,
        ...updatedData
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  static async findOneAndDelete(query: { _id: string; userId: string }): Promise<IProduct | null> {
    try {
      const docRef = db.collection(this.collection).doc(query._id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      const data = doc.data() as IProduct;
      
      // Check if this product belongs to the user
      if (data.userId !== query.userId) {
        return null;
      }
      
      await docRef.delete();
      
      return {
        id: doc.id,
        ...data
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return null;
    }
  }
}