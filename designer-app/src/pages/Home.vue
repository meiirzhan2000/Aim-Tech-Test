<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <NewsSection />
    <section class="cta-section py-20 relative overflow-hidden">
      <div class="cta-gradient absolute inset-0"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto text-gray-200">Join thousands of designers who are already using AIM Designer to streamline their workflow.</p>
        <router-link to="/auth" class="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out">
          Get Started Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '../components/home/HeroSection.vue';
import FeaturesSection from '../components/home/FeaturesSection.vue';
import HowItWorksSection from '../components/home/HowItWorks.vue';
import NewsSection from '../components/home/NewsSection.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    NewsSection
  }
});
</script>

<style scoped>
.cta-section {
  background-color: #111827;
}

.cta-gradient {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  opacity: 0.9;
}

.text-white {
  color: #fff;
}

.text-gray-200 {
  color: #e5e7eb;
}
</style>