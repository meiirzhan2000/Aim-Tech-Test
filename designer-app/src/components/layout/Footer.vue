<template>
    <footer class="footer">
      <div class="container px-4">
        <div class="footer-container">
          <Logo to="/" variant="footer" />
          
          <div class="footer-links">
            <a href="#" class="footer-link">About</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Privacy</a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">&copy; {{ new Date().getFullYear() }} AIM Designer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Logo from './Logo.vue';
  
  export default defineComponent({
    name: 'Footer',
    components: {
      Logo
    }
  });
  </script>
  
  <style scoped>
  .footer {
    background-color: #1f2937;
    border-top: 1px solid rgba(75, 85, 99, 0.4);
    padding-top: 3rem;
  }
  
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .footer-container {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .footer-link {
    color: #9ca3af;
    font-size: 0.875rem;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #3b82f6;
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(75, 85, 99, 0.4);
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  .copyright {
    color: #9ca3af;
    font-size: 0.875rem;
    text-align: center;
  }
  </style>