<template>
    <div 
      class="mobile-menu md:hidden" 
      :class="{ 'block': isOpen, 'hidden': !isOpen }"
    >
      <nav class="mobile-nav">
        <router-link 
          v-for="link in links"
          :key="link.to"
          :to="link.to" 
          class="mobile-nav-link" 
          :class="{ 'active': isActiveRoute(link.to) }"
          @click="onClick"
        >
          {{ link.text }}
        </router-link>
        
        <router-link 
          v-if="!isAuthenticated" 
          to="/auth" 
          class="mobile-nav-link auth-link"
          @click="onClick"
        >
          Sign In
        </router-link>
        <button 
            v-else 
            @click="(e: MouseEvent) => onLogout(e)" 
            class="mobile-nav-link auth-link"
        >
            Sign Out
        </button>
      </nav>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface NavLink {
    to: string;
    text: string;
  }
  
  export default defineComponent({
    name: 'MobileNav',
    props: {
      links: {
        type: Array as PropType<NavLink[]>,
        required: true
      },
      isOpen: {
        type: Boolean,
        required: true
      },
      isAuthenticated: {
        type: Boolean,
        required: true
      },
      onClick: {
        type: Function,
        default: () => {}
      },
      onLogout: {
        type: Function,
        required: true
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
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1f2937;
    border-bottom: 1px solid rgba(75, 85, 99, 0.4);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 40;
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }
  
  .mobile-nav-link {
    display: block;
    padding: 0.75rem 1.5rem;
    color: #e5e7eb;
    font-size: 1rem;
    transition: background-color 0.3s;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .mobile-nav-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .mobile-nav-link.active {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .auth-link {
    margin-top: 0.5rem;
    border-top: 1px solid rgba(75, 85, 99, 0.4);
    width: 100%;
    font-weight: 500;
  }
  </style>