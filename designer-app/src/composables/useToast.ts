import { ref, reactive } from 'vue';

interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  duration?: number;
  dismissible?: boolean;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  duration: number;
  dismissible: boolean;
}

let toastId = 0;

// Create toast outside of component to maintain state across components
const toasts = reactive<Toast[]>([]);

export function useToast() {
  const defaultOptions: ToastOptions = {
    type: 'info',
    duration: 4000,
    dismissible: true,
  };
  
  /**
   * Show a toast notification
   */
  const showToast = (message: string, options: ToastOptions = {}) => {
    const id = ++toastId;
    
    const toast: Toast = {
      id,
      message,
      type: options.type || defaultOptions.type as 'success' | 'error' | 'warning' | 'info',
      title: options.title,
      duration: options.duration !== undefined ? options.duration : defaultOptions.duration as number,
      dismissible: options.dismissible !== undefined ? options.dismissible : defaultOptions.dismissible as boolean
    };
    
    toasts.push(toast);
    
    // Auto dismiss
    if (toast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration);
    }
    
    return id;
  };
  
  /**
   * Show a success toast
   */
  const success = (message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'success' });
  };
  
  /**
   * Show an error toast
   */
  const error = (message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'error' });
  };
  
  /**
   * Show a warning toast
   */
  const warning = (message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'warning' });
  };
  
  /**
   * Show an info toast
   */
  const info = (message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'info' });
  };
  
  /**
   * Dismiss a toast by id
   */
  const dismissToast = (id: number) => {
    const index = toasts.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
    }
  };
  
  /**
   * Dismiss all toasts
   */
  const dismissAll = () => {
    toasts.splice(0, toasts.length);
  };
  
  return {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    dismissToast,
    dismissAll
  };
}