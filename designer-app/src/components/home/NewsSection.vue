<template>
    <section class="py-20 bg-dark">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 text-white">Latest News</h2>
          <p class="text-gray-300 max-w-2xl mx-auto">Stay up to date with the latest trends and updates in the design world.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-if="loading" class="col-span-3 text-center py-12">
            <div class="inline-block animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12"></div>
            <p class="mt-4 text-gray-300">Loading latest news...</p>
          </div>
          <div v-else-if="newsItems.length === 0" class="col-span-3 text-center py-12">
            <p class="text-gray-300">No news available at the moment. Please check back later.</p>
          </div>
          <div v-else v-for="(item, index) in newsItems" :key="index" class="news-card">
            <div class="news-image bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="w-full h-full object-cover absolute inset-0 opacity-60" />
              <div v-else class="flex items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-7"/>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <p class="text-sm text-primary mb-2">{{ formatNewsDate(item.publishedAt) }}</p>
              <h3 class="text-xl font-semibold mb-2 line-clamp-2 text-white">{{ item.title }}</h3>
              <p class="text-gray-300 mb-4 line-clamp-3">{{ item.description }}</p>
              <a :href="item.url" target="_blank" class="text-primary hover:text-primary-light hover:underline transition inline-flex items-center">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useLanding } from '../../composables/useLanding';
  
  export default defineComponent({
    name: 'NewsSection',
    setup() {
      const { loading, newsItems, formatNewsDate } = useLanding();
  
      return {
        loading,
        newsItems,
        formatNewsDate
      };
    }
  });
  </script>
  
  <style scoped>
  .bg-dark {
    background-color: #1a202c;
  }
  
  .news-card {
    background-color: #2d3748;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .news-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .news-image {
    height: 200px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    font-size: 3rem;
    font-weight: 700;
  }
</style>