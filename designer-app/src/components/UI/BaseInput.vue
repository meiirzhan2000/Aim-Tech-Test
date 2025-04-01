<template>
    <div>
      <label v-if="label" :for="id" class="form-label">{{ label }}</label>
      <div class="relative">
        <span v-if="iconLeft" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <slot name="icon-left"></slot>
        </span>
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          :class="[
            'input-field', 
            iconLeft ? 'pl-10' : '',
            iconRight ? 'pr-10' : ''
          ]"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="iconRight" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <slot name="icon-right"></slot>
        </span>
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseInput',
    props: {
      id: {
        type: String,
        required: true
      },
      modelValue: {
        type: [String, Number],
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      },
      iconLeft: {
        type: Boolean,
        default: false
      },
      iconRight: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue']
  });
  </script>