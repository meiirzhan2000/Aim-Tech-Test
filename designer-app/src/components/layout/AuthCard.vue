<template>
    <div class="auth-card">
      <div class="auth-logo">
        <Logo to="/" />
      </div>
      
      <h1 class="auth-title"><slot name="title">Welcome</slot></h1>
      <p class="auth-subtitle"><slot name="subtitle">Manage your design business efficiently</slot></p>
      
      <slot />
      
      <div class="auth-footer">
        <slot name="footer">
          <router-link to="/" class="return-link">Return to Home</router-link>
        </slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Logo from './Logo.vue';
  
  export default defineComponent({
    name: 'AuthCard',
    components: {
      Logo
    }
  });
  </script>
  
  <style scoped>
  .auth-card {
    width: 100%;
    max-width: 28rem;
    padding: 2rem;
    background-color: #1f2937;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  .auth-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .auth-title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .auth-subtitle {
    font-size: 1rem;
    color: #9ca3af;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .auth-footer {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  .return-link {
    color: #3b82f6;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s;
  }
  
  .return-link:hover {
    color: #60a5fa;
    text-decoration: underline;
  }
  </style>