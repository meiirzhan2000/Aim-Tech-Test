<template>
    <router-link :to="to" class="logo" :class="{ 'footer-logo': variant === 'footer' }">
      <svg viewBox="0 0 24 24" class="logo-icon" :class="{ 'footer-icon': variant === 'footer' }">
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2" />
        <path d="M12 7L16 16H8L12 7Z" fill="currentColor" />
      </svg>
      <span class="logo-text" :class="{ 'footer-text': variant === 'footer' }">AIM Designer</span>
    </router-link>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Logo',
    props: {
      to: {
        type: String,
        default: '/'
      },
      variant: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'footer'].includes(value)
      }
    }
  });
  </script>
  
  <style scoped>
  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    z-index: 50;
  }
  
  .logo-icon {
    width: 2rem;
    height: 2rem;
    color: #3b82f6;
    margin-right: 0.5rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #3b82f6;
  }
  
  /* Footer variant */
  .footer-logo {
    text-decoration: none;
  }
  
  .footer-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .footer-text {
    font-size: 1rem;
    color: white;
  }
  </style>