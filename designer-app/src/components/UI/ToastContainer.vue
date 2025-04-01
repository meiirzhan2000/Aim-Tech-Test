<template>
    <Teleport to="body">
      <div class="toast-container">
        <transition-group name="toast-anim">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="toast"
            :class="[`toast-${toast.type}`]"
          >
            <div class="toast-icon">
              <!-- Success Icon -->
              <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              
              <!-- Error Icon -->
              <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              
              <!-- Info Icon -->
              <svg v-else-if="toast.type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              <!-- Warning Icon -->
              <svg v-else-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div class="toast-content">
              <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
              <div class="toast-message">{{ toast.message }}</div>
            </div>
            
            <button 
              v-if="toast.dismissible" 
              class="toast-close" 
              @click="dismissToast(toast.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </transition-group>
      </div>
    </Teleport>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useToast } from '../../composables/useToast';
  
  export default defineComponent({
    name: 'ToastContainer',
    setup() {
      const { toasts, dismissToast } = useToast();
      
      return {
        toasts,
        dismissToast
      };
    }
  });
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 100;
    max-width: 24rem;
  }
  
  .toast {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 0.375rem;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .toast-icon {
    flex-shrink: 0;
    margin-right: 0.75rem;
    margin-top: 0.125rem;
  }
  
  .toast-content {
    flex: 1;
  }
  
  .toast-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .toast-message {
    font-size: 0.875rem;
  }
  
  .toast-close {
    background: transparent;
    border: none;
    color: currentColor;
    opacity: 0.5;
    cursor: pointer;
    margin-left: 0.5rem;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }
  
  .toast-close:hover {
    opacity: 1;
  }
  
  /* Toast types */
  .toast-success {
    background-color: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
  }
  
  .toast-error {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }
  
  .toast-warning {
    background-color: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #f59e0b;
  }
  
  .toast-info {
    background-color: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
  }
  
  /* Animations */
  .toast-anim-enter-active,
  .toast-anim-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-anim-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .toast-anim-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>