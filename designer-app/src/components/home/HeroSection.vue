<template>
    <section class="hero-section relative overflow-hidden py-20 pb-32 md:py-32">
      <div class="hero-gradient absolute inset-0"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 py-6 text-white hero-title">Design Your Success with AIM Designer</h1>
          <p class="text-xl mb-8 text-gray-200">The ultimate platform for designers to manage products, track projects, and streamline workflows.</p>
          <div class="flex flex-wrap gap-4 pb-16">
            <router-link to="/auth" class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style="color: white !important; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
              Get Started
            </router-link>
            <a href="#features" class="btn-outline px-6 py-3 rounded-lg text-white font-medium hover:bg-white hover:bg-opacity-10 transition">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#1a202c">
          <path d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,64C1120,64,1280,32,1360,16L1440,0L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  </template>
  
  <style scoped>
  .hero-section {
    background-color: #111827;
    position: relative;
  }
  
  .hero-gradient {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    opacity: 0.8;
  }
  
  .hero-title {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .btn-outline {
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  .btn-outline:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .text-white {
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  </style>