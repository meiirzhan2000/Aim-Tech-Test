<template>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="name-fields">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            v-model="formState.fields.firstName.value"
            id="firstName"
            type="text"
            required
            placeholder="Enter your first name"
            :class="{ 'error': formState.errors.firstName }"
            @blur="formState.validateField('firstName')"
          />
          <p v-if="formState.errors.firstName" class="error-text">{{ formState.errors.firstName }}</p>
        </div>
  
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            v-model="formState.fields.lastName.value"
            id="lastName"
            type="text"
            required
            placeholder="Enter your last name"
            :class="{ 'error': formState.errors.lastName }"
            @blur="formState.validateField('lastName')"
          />
          <p v-if="formState.errors.lastName" class="error-text">{{ formState.errors.lastName }}</p>
        </div>
      </div>
  
      <div class="form-group">
        <label for="regEmail">Email Address</label>
        <input
          v-model="formState.fields.email.value"
          id="regEmail"
          type="email"
          required
          placeholder="Enter your email"
          :class="{ 'error': formState.errors.email }"
          @blur="formState.validateField('email')"
        />
        <p v-if="formState.errors.email" class="error-text">{{ formState.errors.email }}</p>
      </div>
  
      <div class="form-group">
        <label for="phone">Phone Number (optional)</label>
        <input
          v-model="formState.fields.phone.value"
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
      </div>
  
      <div class="form-group">
        <label for="regPassword">Password</label>
        <input
          v-model="formState.fields.password.value"
          id="regPassword"
          type="password"
          required
          placeholder="Create a password"
          :class="{ 'error': formState.errors.password }"
          @blur="formState.validateField('password')"
        />
        <p v-if="formState.errors.password" class="error-text">{{ formState.errors.password }}</p>
      </div>
  
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          v-model="formState.fields.confirmPassword.value"
          id="confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
          :class="{ 'error': formState.errors.confirmPassword }"
          @blur="formState.validateField('confirmPassword')"
        />
        <p v-if="formState.errors.confirmPassword" class="error-text">{{ formState.errors.confirmPassword }}</p>
      </div>
  
      <button type="submit" class="submit-button" :disabled="loading ? true : false">
        <span v-if="loading" class="spinner"></span>
        <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
      </button>
  
      <div v-if="error" class="error-alert mt-4">
        <span>{{ error }}</span>
        <button class="close-button" @click="error = ''" aria-label="Close">×</button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  import { useForm, required, email, minLength, confirmed } from '../../composables/useForm';
  
  // Define Emits
  const emit = defineEmits(['success']);
  
  // Setup state
  const router = useRouter();
  const authStore = useAuthStore();
  const error = ref('');
  const loading = ref(false);
  
  // Initialize form with useForm composable
  const formState = useForm({
    firstName: {
      value: '',
      rules: [
        required('First name is required')
      ]
    },
    lastName: {
      value: '',
      rules: [
        required('Last name is required')
      ]
    },
    email: {
      value: '',
      rules: [
        required('Email is required'),
        email('Please enter a valid email address')
      ]
    },
    phone: {
      value: ''
    },
    password: {
      value: '',
      rules: [
        required('Password is required'),
        minLength(6, 'Password must be at least 6 characters')
      ]
    },
    confirmPassword: {
      value: '',
      rules: [
        required('Please confirm your password'),
        confirmed(() => formState.fields.password.value, 'Passwords do not match')
      ]
    }
  });
  
  // Handle form submission
  const handleSubmit = async () => {
    error.value = '';
    loading.value = true;
  
    try {
      await formState.handleSubmit(async (values) => {
        await authStore.register(
          values.email,
          values.password,
          values.firstName,
          values.lastName,
          values.phone
        );
        emit('success');
        router.push('/profile');
      }, { resetOnSuccess: false });
    } catch (err: any) {
      error.value = err.message || 'Failed to register';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .name-fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  @media (min-width: 640px) {
    .name-fields {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(209, 213, 219, 1);
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    width: 100%;
    padding: 0.625rem 0.75rem;
    background-color: rgba(55, 65, 81, 0.5);
    border: 1px solid rgba(75, 85, 99, 1);
    border-radius: 0.375rem;
    color: white;
    font-size: 0.875rem;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="tel"]:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
  
  input.error {
    border-color: #ef4444;
  }
  
  .submit-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.625rem 1rem;
    background-color: #3b82f6;
    background-image: linear-gradient(to right, #3b82f6, #2563eb);
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .submit-button:hover:not(:disabled) {
    background-image: linear-gradient(to right, #2563eb, #1d4ed8);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .error-text {
    font-size: 0.75rem;
    color: #ef4444;
    margin-top: 0.25rem;
  }
  
  .error-alert {
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    background-color: rgba(220, 38, 38, 0.2);
    border: 1px solid rgba(220, 38, 38, 0.5);
    border-radius: 0.375rem;
    color: rgba(254, 202, 202, 1);
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    color: rgba(254, 202, 202, 0.7);
    font-size: 1.25rem;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: rgba(254, 202, 202, 1);
  }
  
  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    margin-right: 0.5rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  </style>