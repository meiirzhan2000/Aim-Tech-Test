<template>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          v-model="form.fields.email.value"
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          :class="{ 'error': form.errors.email }"
          @blur="form.validateField('email')"
        />
        <p v-if="form.errors.email" class="error-text">{{ form.errors.email }}</p>
      </div>
  
      <div class="form-group">
        <div class="password-header">
          <label for="password">Password</label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>
        <input
          v-model="form.fields.password.value"
          id="password"
          type="password"
          required
          placeholder="Enter your password"
          :class="{ 'error': form.errors.password }"
          @blur="form.validateField('password')"
        />
        <p v-if="form.errors.password" class="error-text">{{ form.errors.password }}</p>
      </div>
  
      <div class="remember-me">
        <input
          id="remember-me"
          type="checkbox"
          v-model="form.fields.rememberMe.value"
        />
        <label for="remember-me">Remember me</label>
      </div>
  
      <button type="submit" class="submit-button" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
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
  import { useForm, required, email, minLength } from '../../composables/useForm';
  
  defineEmits(['success']);
  
  const router = useRouter();
  const authStore = useAuthStore();
  const error = ref('');
  const loading = ref(false);
  
  const form = useForm({
    email: {
      value: '',
      rules: [
        required('Email is required'),
        email('Please enter a valid email address')
      ]
    },
    password: {
      value: '',
      rules: [
        required('Password is required'),
        minLength(6, 'Password must be at least 6 characters')
      ]
    },
    rememberMe: {
      value: false
    }
  });
  
  const handleSubmit = async () => {
    error.value = '';
    loading.value = true;
  
    try {
      await form.handleSubmit(async (values) => {
        await authStore.login(values.email, values.password);
        router.push('/profile');
      }, { resetOnSuccess: false });
    } catch (err: any) {
      error.value = err.message || 'Failed to login';
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
  
  .password-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(209, 213, 219, 1);
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
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
  input[type="password"]:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
  
  input.error {
    border-color: #ef4444;
  }
  
  .forgot-link {
    font-size: 0.75rem;
    color: #3b82f6;
    text-decoration: none;
  }
  
  .forgot-link:hover {
    color: #60a5fa;
    text-decoration: underline;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .remember-me input {
    width: 1rem;
    height: 1rem;
  }
  
  .remember-me label {
    font-size: 0.875rem;
    color: rgba(209, 213, 219, 1);
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