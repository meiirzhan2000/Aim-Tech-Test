// auth.ts store
import { defineStore } from 'pinia';
import { auth, db } from '../services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface User {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  authReady: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
    authReady: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
  
  actions: {
    listenForAuthChanges() {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // User is signed in
            console.log('User is signed in with Firebase Auth:', firebaseUser.uid);
            try {
              // Get user data from Firestore
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              
              if (userDoc.exists()) {
                this.user = { ...userDoc.data(), uid: firebaseUser.uid } as User;
                console.log('User data loaded from Firestore:', this.user);
              } else {
                // Basic user data if not found in Firestore
                this.user = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  firstName: '',
                  lastName: ''
                };
                console.log('Basic user created:', this.user);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              // Still set user with basic info to avoid getting stuck
              this.user = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                firstName: '',
                lastName: ''
              };
            }
          } else {
            // User is signed out
            console.log('No user found in Firebase Auth');
            this.user = null;
          }
          
          // Mark auth as ready regardless of outcome
          this.authReady = true;
          resolve();
        });
      });
    },
    
    async register(email: string, password: string, firstName: string, lastName: string, phone?: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save additional user data in Firestore
        const userData: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          firstName,
          lastName,
          phone
        };
        
        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        
        this.user = userData;
        
        return userData;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // User data will be set by the auth listener
        return userCredential;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        await signOut(auth);
        // User will be set to null by the auth listener
      } catch (error: any) {
        this.error = error.message;
        throw error;
      }
    },
    
    async fetchUserData() {
      if (!auth.currentUser) return;
      
      this.loading = true;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        
        if (userDoc.exists()) {
          this.user = { ...userDoc.data(), uid: auth.currentUser.uid } as User;
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async updateUserProfile(data: Partial<User>) {
      if (!auth.currentUser || !this.user) {
        throw new Error('No authenticated user');
      }
      
      this.loading = true;
      
      try {
        // Update Firestore document
        await updateDoc(doc(db, 'users', auth.currentUser.uid), data);
        
        // Update local user data
        this.user = {
          ...this.user,
          ...data
        };
        
        return this.user;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async changePassword(currentPassword: string, newPassword: string) {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      
      this.loading = true;
      
      try {
        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          currentPassword
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        
        // Update password
        await updatePassword(auth.currentUser, newPassword);
        
        return true;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteAccount(password: string) {
      if (!auth.currentUser || !this.user) {
        throw new Error('No authenticated user');
      }
      
      this.loading = true;
      
      try {
        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          password
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        
        // Get user products
        const productsQuery = query(
          collection(db, 'products'),
          where('userId', '==', auth.currentUser.uid)
        );
        
        const productsSnapshot = await getDocs(productsQuery);
        
        // Delete each product
        const productDeletions = productsSnapshot.docs.map(doc => 
          deleteDoc(doc.ref)
        );
        
        await Promise.all(productDeletions);
        
        // Delete user document
        await deleteDoc(doc(db, 'users', auth.currentUser.uid));
        
        // Delete Firebase Auth user
        await deleteUser(auth.currentUser);
        
        // Clear local user data
        this.user = null;
        
        return true;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});