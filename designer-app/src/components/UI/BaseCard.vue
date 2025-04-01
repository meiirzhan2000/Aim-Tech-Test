<template>
    <div :class="['card', { 'hover:shadow-lg': hover }]">
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseCard',
    props: {
      hover: {
        type: Boolean,
        default: false
      }
    }
  });
  </script>