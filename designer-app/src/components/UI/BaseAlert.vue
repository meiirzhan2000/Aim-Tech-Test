<template>
    <transition name="alert-fade">
      <div v-if="show" class="alert" :class="[`alert-${type}`]">
        <div class="alert-icon">
          <!-- Success Icon -->
          <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          
          <!-- Error Icon -->
          <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          
          <!-- Info Icon -->
          <svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          <!-- Warning Icon -->
          <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div class="alert-content">
          <div v-if="title" class="alert-title">{{ title }}</div>
          <div class="alert-message">{{ message }}</div>
        </div>
        
        <button v-if="dismissible" class="alert-close" @click="dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  
  export default defineComponent({
    name: 'BaseAlert',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: (value: string) => ['success', 'error', 'warning', 'info'].includes(value)
      },
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        default: 4000 // Auto dismiss after 4 seconds, 0 to disable
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    emits: ['dismiss'],
    setup(props, { emit }) {
      const show = ref(true);
      let timer: number | null = null;
      
      const dismiss = () => {
        show.value = false;
        emit('dismiss');
      };
      
      const startTimer = () => {
        if (props.autoClose && props.duration > 0) {
          timer = window.setTimeout(() => {
            dismiss();
          }, props.duration);
        }
      };
      
      const clearTimer = () => {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
      };
      
      onMounted(() => {
        startTimer();
      });
      
      // Restart timer if duration changes
      watch(() => props.duration, (newVal, oldVal) => {
        clearTimer();
        if (newVal > 0 && props.autoClose) {
          startTimer();
        }
      });
      
      // Clean up timer on component unmount
      const beforeUnmount = () => {
        clearTimer();
      };
      
      return {
        show,
        dismiss,
        beforeUnmount
      };
    }
  });
  </script>
  
  <style scoped>
  .alert {
    position: relative;
    display: flex;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .alert-icon {
    display: flex;
    align-items: center;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .alert-content {
    flex: 1;
  }
  
  .alert-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .alert-message {
    font-size: 0.875rem;
  }
  
  .alert-close {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    margin: -0.25rem;
    border-radius: 0.25rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  
  .alert-close:hover {
    opacity: 1;
  }
  
  /* Alert types */
  .alert-success {
    background-color: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
  }
  
  .alert-success .alert-icon {
    color: #10b981;
  }
  
  .alert-error {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }
  
  .alert-error .alert-icon {
    color: #ef4444;
  }
  
  .alert-warning {
    background-color: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #f59e0b;
  }
  
  .alert-warning .alert-icon {
    color: #f59e0b;
  }
  
  .alert-info {
    background-color: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
  }
  
  .alert-info .alert-icon {
    color: #3b82f6;
  }
  
  /* Animation */
  .alert-fade-enter-active,
  .alert-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .alert-fade-enter-from,
  .alert-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>