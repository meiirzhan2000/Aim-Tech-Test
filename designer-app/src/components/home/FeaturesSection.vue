<template>
    <section id="features" class="py-20 bg-dark">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 text-white">Powerful Features</h2>
          <p class="text-gray-300 max-w-2xl mx-auto">Designed to help you focus on what matters most - creating stunning designs without the hassle of administrative tasks.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <div class="feature-icon">
              <svg :xmlns="feature.icon.xmlns" class="h-10 w-10" :fill="feature.icon.fill" :viewBox="feature.icon.viewBox" :stroke="feature.icon.stroke">
                <path :stroke-linecap="feature.icon.strokeLinecap" :stroke-linejoin="feature.icon.strokeLinejoin" :stroke-width="feature.icon.strokeWidth" :d="feature.icon.d" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">{{ feature.title }}</h3>
            <p class="text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FeaturesSection',
    data() {
      return {
        features: [
          {
            title: 'Product Management',
            description: 'Easily create, update, and organize your design products in one central location.',
            icon: {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              strokeLinecap: 'round', // Ensure valid value
              strokeLinejoin: 'round', // Ensure valid value
              strokeWidth: 2,
              d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            }
          },
          {
            title: 'Advanced Analytics',
            description: 'Track performance metrics and gain insights to optimize your design business.',
            icon: {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              strokeLinecap: 'round', // Ensure valid value
              strokeLinejoin: 'round', // Ensure valid value
              strokeWidth: 2,
              d: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
            }
          },
          {
            title: 'Seamless Collaboration',
            description: 'Collaborate with clients and team members with real-time updates and feedback.',
            icon: {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              strokeLinecap: 'round', // Ensure valid value
              strokeLinejoin: 'round', // Ensure valid value
              strokeWidth: 2,
              d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
            }
          }
        ]
      };
    }
  });
  </script>
  
  <style scoped>
  .bg-dark {
    background-color: #1a202c;
  }
  
  .feature-card {
    background-color: #2d3748;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 50%;
    color: white;
  }
  </style>