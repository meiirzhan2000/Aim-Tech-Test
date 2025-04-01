<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="profile-title">Your Profile</h1>
      <div class="profile-nav">
        <router-link to="/products" class="profile-nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
          My Products
        </router-link>
      </div>
    </div>
    
    <div class="profile-card">
      <!-- Profile Header -->
      <div class="profile-banner">
        <div class="user-info">
          <h2 class="user-name">{{ userFullName }}</h2>
          <p class="user-email">{{ user?.email }}</p>
        </div>
      </div>
      
      <!-- Profile Information -->
      <div class="profile-content">
        <div class="section">
          <h3 class="section-title">Personal Information</h3>
          
          <form @submit.prevent="updateProfile" class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  id="firstName"
                  v-model="profileForm.firstName"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  id="lastName"
                  v-model="profileForm.lastName"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                id="email"
                v-model="profileForm.email"
                type="email"
                disabled
                class="form-input disabled"
                placeholder="Your email address"
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input
                id="phone"
                v-model="profileForm.phone"
                type="tel"
                class="form-input"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-button" :disabled="loading">
                <span v-if="loading" class="loading-spinner"></span>
                <span>{{ loading ? 'Updating...' : 'Update Profile' }}</span>
              </button>
            </div>
          </form>
        </div>
        
        <div class="section">
          <h3 class="section-title">Account Settings</h3>
          
          <div class="account-actions">
            <button class="action-button outline" @click="showChangePasswordModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
            
            <button class="action-button danger" @click="showDeleteAccountModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Change Password Modal -->
    <div v-if="showChangePasswordModal" class="modal-backdrop">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Change Password</h3>
          <button @click="showChangePasswordModal = false" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="changePassword" class="change-password-form">
            <div class="form-group">
              <label for="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                v-model="passwordForm.currentPassword"
                type="password"
                required
                class="form-input"
                placeholder="Enter your current password"
              />
            </div>
            
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <input
                id="newPassword"
                v-model="passwordForm.newPassword"
                type="password"
                required
                class="form-input"
                placeholder="Enter your new password"
              />
              <p class="password-hint">Password must be at least 8 characters long</p>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                class="form-input"
                placeholder="Confirm your new password"
                :class="{ 'error-input': passwordsNotMatching }"
              />
              <p v-if="passwordsNotMatching" class="error-text">Passwords do not match</p>
            </div>
            
            <div class="modal-actions">
              <button type="button" @click="showChangePasswordModal = false" class="cancel-button">
                Cancel
              </button>
              <button type="submit" class="submit-button" :disabled="passwordLoading || passwordsNotMatching">
                <span v-if="passwordLoading" class="loading-spinner"></span>
                <span>{{ passwordLoading ? 'Updating...' : 'Change Password' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccountModal" class="modal-backdrop">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Delete Account</h3>
          <button @click="showDeleteAccountModal = false" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="warning-box">
            <svg xmlns="http://www.w3.org/2000/svg" class="warning-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="warning-text">This action is permanent and cannot be undone. All your data, including products and personal information, will be permanently deleted.</p>
          </div>
          
          <form @submit.prevent="deleteAccount" class="delete-account-form">
            <div class="form-group">
              <label for="confirmDelete">Please type <strong>DELETE</strong> to confirm</label>
              <input
                id="confirmDelete"
                v-model="deleteConfirmation"
                type="text"
                required
                class="form-input"
                placeholder="Type DELETE"
              />
            </div>
            
            <div class="form-group">
              <label for="deletePassword">Enter your password</label>
              <input
                id="deletePassword"
                v-model="deletePassword"
                type="password"
                required
                class="form-input"
                placeholder="Enter your password"
              />
            </div>
            
            <div class="modal-actions">
              <button type="button" @click="showDeleteAccountModal = false" class="cancel-button">
                Cancel
              </button>
              <button type="submit" class="danger-button" :disabled="deleteLoading || deleteConfirmation !== 'DELETE'">
                <span v-if="deleteLoading" class="loading-spinner"></span>
                <span>{{ deleteLoading ? 'Deleting...' : 'Permanently Delete Account' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Success/Error Alert -->
    <div v-if="alert" :class="['alert', alert.type === 'success' ? 'success' : 'error']">
      <div class="alert-content">
        <span class="alert-icon">{{ alert.type === 'success' ? '✓' : '✕' }}</span>
        <span>{{ alert.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { 
  doc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  updatePassword, 
  deleteUser 
} from 'firebase/auth';
import { db, auth } from '../services/firebase';

interface AlertType {
  type: 'success' | 'error';
  message: string;
}

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const loading = ref(false);
    const passwordLoading = ref(false);
    const deleteLoading = ref(false);
    const alert = ref<AlertType | null>(null);
    
    // Modals
    const showChangePasswordModal = ref(false);
    const showDeleteAccountModal = ref(false);
    
    // Delete account
    const deleteConfirmation = ref('');
    const deletePassword = ref('');
    
    // Password change
    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    const passwordsNotMatching = computed(() => {
      return passwordForm.value.newPassword !== passwordForm.value.confirmPassword && 
             passwordForm.value.confirmPassword.length > 0;
    });
    
    // Get user from store
    const user = computed(() => authStore.currentUser);
    
    // Computed user information
    const userFullName = computed(() => {
      if (!user.value) return 'User';
      
      const firstName = user.value.firstName || '';
      const lastName = user.value.lastName || '';
      
      if (!firstName && !lastName) return 'User';
      
      return `${firstName} ${lastName}`.trim();
    });
    
    // Profile form
    const profileForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    
    // Load user data on mount
    onMounted(async () => {
      // Fetch user data from Firestore
      await authStore.fetchUserData();
      
      // Initialize form with user data
      if (user.value) {
        profileForm.value.firstName = user.value.firstName || '';
        profileForm.value.lastName = user.value.lastName || '';
        profileForm.value.email = user.value.email || '';
        profileForm.value.phone = user.value.phone || '';
      }
    });
    
    // Show alert
    const showAlert = (type: 'success' | 'error', message: string, timeout: number = 3000) => {
      alert.value = { type, message };
      
      setTimeout(() => {
        alert.value = null;
      }, timeout);
    };
    
    // Update profile
    const updateProfile = async () => {
      if (!user.value) return;
      
      loading.value = true;
      
      try {
        // Update Firestore document
        await updateDoc(doc(db, 'users', user.value.uid), {
          firstName: profileForm.value.firstName,
          lastName: profileForm.value.lastName,
          phone: profileForm.value.phone
        });
        
        // Update store
        await authStore.fetchUserData();
        
        // Show success message
        showAlert('success', 'Profile updated successfully!');
      } catch (error: any) {
        showAlert('error', error.message || 'Failed to update profile');
      } finally {
        loading.value = false;
      }
    };
    
    // Change password
    const changePassword = async () => {
      if (!auth.currentUser) return;
      
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        showAlert('error', 'Passwords do not match');
        return;
      }
      
      if (passwordForm.value.newPassword.length < 8) {
        showAlert('error', 'Password must be at least 8 characters long');
        return;
      }
      
      passwordLoading.value = true;
      
      try {
        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          passwordForm.value.currentPassword
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        
        // Update password
        await updatePassword(auth.currentUser, passwordForm.value.newPassword);
        
        // Reset form and close modal
        passwordForm.value = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        
        showChangePasswordModal.value = false;
        
        // Show success message
        showAlert('success', 'Password updated successfully!');
      } catch (error: any) {
        let errorMessage = '';
        
        if (error.code === 'auth/wrong-password') {
          errorMessage = 'Current password is incorrect';
        } else if (error.code === 'auth/requires-recent-login') {
          errorMessage = 'Please log out and log back in before changing your password';
        } else {
          errorMessage = error.message || 'Failed to update password';
        }
        
        showAlert('error', errorMessage);
      } finally {
        passwordLoading.value = false;
      }
    };
    
    // Delete account
    const deleteAccount = async () => {
      if (!auth.currentUser || !user.value) return;
      
      if (deleteConfirmation.value !== 'DELETE') {
        showAlert('error', 'Please type DELETE to confirm');
        return;
      }
      
      deleteLoading.value = true;
      
      try {
        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          deletePassword.value
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        
        // Delete user's products
        const productsQuery = query(
          collection(db, 'products'),
          where('userId', '==', user.value.uid)
        );
        
        const productsSnapshot = await getDocs(productsQuery);
        
        // Delete each product
        const productDeletions = productsSnapshot.docs.map(doc => 
          deleteDoc(doc.ref)
        );
        
        await Promise.all(productDeletions);
        
        // Delete user document from Firestore
        await deleteDoc(doc(db, 'users', user.value.uid));
        
        // Delete Firebase Auth user
        await deleteUser(auth.currentUser);
        
        // Sign out (authStore user will be set to null by the auth listener)
        await authStore.logout();
        
        // Redirect to home page
        router.push('/');
        
        // No need for success alert as we're redirecting
      } catch (error: any) {
        let errorMessage = '';
        
        if (error.code === 'auth/wrong-password') {
          errorMessage = 'Password is incorrect';
        } else if (error.code === 'auth/requires-recent-login') {
          errorMessage = 'Please log out and log back in before deleting your account';
        } else {
          errorMessage = error.message || 'Failed to delete account';
        }
        
        showAlert('error', errorMessage);
        
        // Reset form and close modal
        deleteConfirmation.value = '';
        deletePassword.value = '';
        showDeleteAccountModal.value = false;
      } finally {
        deleteLoading.value = false;
      }
    };
    
    return {
      user,
      userFullName,
      profileForm,
      loading,
      alert,
      updateProfile,
      showChangePasswordModal,
      showDeleteAccountModal,
      passwordForm,
      passwordsNotMatching,
      passwordLoading,
      changePassword,
      deleteConfirmation,
      deletePassword,
      deleteLoading,
      deleteAccount
    };
  }
});
</script>

<style scoped>
.profile-container {
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.profile-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
}

.profile-nav {
  display: flex;
  gap: 1rem;
}

.profile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.profile-nav-link:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.profile-card {
  background-color: #1f2937;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.profile-banner {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  padding: 2rem;
  color: white;
}

.user-info {
  text-align: center;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.user-email {
  font-size: 0.875rem;
  opacity: 0.9;
}

.profile-content {
  padding: 2rem;
}

.section {
  margin-bottom: 1rem;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e5e7eb;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  background-color: #374151;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  color: white;
  font-size: 0.875rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input.disabled {
  background-color: #2d3748;
  border-color: #4b5563;
  color: #9ca3af;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.account-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button.outline {
  background-color: transparent;
  border: 1px solid #4b5563;
  color: #e5e7eb;
}

.action-button.outline:hover {
  background-color: rgba(75, 85, 99, 0.1);
}

.action-button.danger {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.action-button.danger:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.alert {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: slideIn 0.3s ease-out;
  z-index: 50;
}

.alert.success {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.alert.error {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-icon {
  font-size: 1.25rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-container {
  background-color: #1f2937;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #374151;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.close-button {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.close-button:hover {
  color: white;
}

.modal-body {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #4b5563;
  color: #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-button:hover {
  background-color: rgba(75, 85, 99, 0.1);
}

.danger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s;
}

.danger-button:hover {
  background-color: #dc2626;
}

.danger-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.warning-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.warning-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #ef4444;
  flex-shrink: 0;
}

.warning-text {
  color: #f87171;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.password-hint {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.error-input {
  border-color: #ef4444 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>