<template>
    <div class="empty-state">
      <div class="spinner"></div>
      <p class="mt-4 text-gray-500">{{ message }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseLoading',
    props: {
      message: {
        type: String,
        default: 'Loading...'
      }
    }
  });
  </script>