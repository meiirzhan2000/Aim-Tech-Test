<template>
    <nav class="main-nav">
      <router-link 
        v-for="link in links" 
        :key="link.to"
        :to="link.to" 
        class="nav-link" 
        :class="{ 'active': isActiveRoute(link.to) }"
        @click="onClick"
      >
        {{ link.text }}
      </router-link>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface NavLink {
    to: string;
    text: string;
  }
  
  export default defineComponent({
    name: 'NavLinks',
    props: {
      links: {
        type: Array as PropType<NavLink[]>,
        required: true
      },
      onClick: {
        type: Function,
        default: () => {}
      }
    },
    setup() {
      const route = useRoute();
      
      const isActiveRoute = (path: string) => {
        if (path === '/' && route.path === '/') {
          return true;
        }
        if (path === '/products' && route.path.startsWith('/products')) {
          return true;
        }
        return route.path === path;
      };
      
      return {
        isActiveRoute
      };
    }
  });
  </script>
  
  <style scoped>
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: #e5e7eb;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
    padding: 0.5rem 0;
  }
  
  .nav-link:hover {
    color: white;
  }
  
  .nav-link.active {
    color: #3b82f6;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3b82f6;
    border-radius: 1px;
  }
  </style>