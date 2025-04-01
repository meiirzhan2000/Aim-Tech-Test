<template>
    <div class="empty-state">
      <div class="mb-4">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </slot>
      </div>
      <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
      <p class="mt-1 text-gray-500">{{ message }}</p>
      <div v-if="$slots.action" class="mt-6">
        <slot name="action"></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseEmptyState',
    props: {
      title: {
        type: String,
        default: 'No data found'
      },
      message: {
        type: String,
        default: 'There are no items to display at this time.'
      }
    }
  });
  </script>