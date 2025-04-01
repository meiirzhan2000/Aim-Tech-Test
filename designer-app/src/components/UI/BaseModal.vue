<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button 
              @click="closeModal"
              class="modal-close-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button 
                class="cancel-button" 
                @click="closeModal"
              >
                {{ cancelText }}
              </button>
              <button 
                :class="['confirm-button', { 'confirm-danger': confirmDanger }]"
                @click="confirmAction"
              >
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">

// Define props with proper types
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmDanger: {
    type: Boolean,
    default: false
  }
});

// Define emits
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

// Handle closing the modal
const closeModal = () => {
  emit('update:modelValue', false);
  emit('cancel');
};

// Handle confirmation
const confirmAction = () => {
  emit('confirm');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow-y: auto;
  padding: 1rem;
}

.modal-container {
  background-color: #1f2937;
  border-radius: 0.75rem;
  max-width: 32rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.5);
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
}

.modal-close-button {
  background: transparent;
  border: none;
  color: rgba(156, 163, 175, 1);
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close-button:hover {
  color: rgba(209, 213, 219, 1);
}

.modal-content {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid rgba(75, 85, 99, 0.5);
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

.confirm-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.confirm-button:hover {
  background-color: #2563eb;
}

.confirm-danger {
  background-color: #ef4444;
}

.confirm-danger:hover {
  background-color: #dc2626;
}

/* Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>