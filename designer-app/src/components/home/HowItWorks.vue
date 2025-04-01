<template>
    <section class="py-20 bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 text-white">How It Works</h2>
          <p class="text-gray-300 max-w-2xl mx-auto">Getting started with AIM Designer is simple and straightforward.</p>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          <div class="text-center max-w-xs" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="text-xl font-semibold mb-2 text-white">{{ step.title }}</h3>
            <p class="text-gray-300">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="hidden md:block text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HowItWorksSection',
    data() {
      return {
        steps: [
          {
            title: 'Create an Account',
            description: 'Sign up and set up your designer profile in just a few minutes.'
          },
          {
            title: 'Add Your Products',
            description: 'Upload and organize your design products with detailed information.'
          },
          {
            title: 'Start Growing',
            description: 'Use our tools to track performance, analyze trends, and grow your business.'
          }
        ]
      };
    }
  });
  </script>
  
  <style scoped>
  .bg-gray-900 {
    background-color: #1a202c;
  }
  
  .step-number {
    width: 60px;
    height: 60px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
  }
  </style>