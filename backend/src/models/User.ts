import { db } from '../config/firebase';
import { Timestamp } from 'firebase-admin/firestore';
import bcrypt from 'bcrypt';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}

export class User {
  private static collection = 'users';

  static async findOne(query: Partial<IUser>): Promise<IUser | null> {
    try {
      const usersRef = db.collection(this.collection);
      
      // Handle findOne by email
      if (query.email) {
        const snapshot = await usersRef.where('email', '==', query.email).get();
        
        if (snapshot.empty) {
          return null;
        }
        
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as IUser;
      }
      
      return null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<IUser | null> {
    try {
      const docRef = db.collection(this.collection).doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      return { id: doc.id, ...doc.data() } as IUser;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  static async create(userData: IUser): Promise<IUser> {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await db.collection(this.collection).add(newUser);
    
    return {
      id: docRef.id,
      ...newUser
    };
  }

  static async comparePassword(userId: string, candidatePassword: string): Promise<boolean> {
    try {
      const user = await this.findById(userId);
      if (!user) return false;
      
      return bcrypt.compare(candidatePassword, user.password);
    } catch (error) {
      console.error('Error comparing password:', error);
      return false;
    }
  }
}