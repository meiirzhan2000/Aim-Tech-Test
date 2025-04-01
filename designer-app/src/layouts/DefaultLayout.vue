<template>
  <div class="layout">
    <header class="header">
      <div class="container header-container">
        <Logo to="/" />
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-button md:hidden" @click="toggleMobileMenu">
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Desktop Navigation -->
        <div class="nav-actions hidden md:flex">
          <NavLinks :links="navLinks" />
          
          <router-link 
            v-if="!isAuthenticated" 
            to="/auth" 
            class="sign-in-button"
          >
            Sign In
          </router-link>
          <button 
            v-else 
            @click="logout" 
            class="sign-out-button"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <MobileNav 
        :links="navLinks"
        :is-open="mobileMenuOpen"
        :is-authenticated="isAuthenticated"
        :on-click="closeMobileMenu"
        :on-logout="mobileLogout"
      />
    </header>
    
    <main class="main-content">
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import Logo from '@/components/layout/Logo.vue';
import NavLinks from '@/components/layout/NavLinks.vue';
import MobileNav from '@/components/layout/MobileNav.vue';
import Footer from '@/components/layout/Footer.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Logo,
    NavLinks,
    MobileNav,
    Footer
  },
  setup() {
    const authStore = useAuthStore();
    
    // Mobile menu state
    const mobileMenuOpen = ref(false);
    
    const navLinks = [
      { to: '/', text: 'Home' },
      { to: '/profile', text: 'Profile', auth: true },
      { to: '/products', text: 'Products', auth: true }
    ].filter(link => !link.auth || authStore.isAuthenticated);
    
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };
    
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    const router = useRouter();
    
    const logout = async () => {
      await authStore.logout();
      router.push('/auth');
    };
    
    const mobileLogout = async () => {
      closeMobileMenu();
      await logout();
    };
    
    return {
      navLinks,
      isAuthenticated,
      logout,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      mobileLogout
    };
  },
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1f2937;
  border-bottom: 1px solid rgba(75, 85, 99, 0.4);
  position: sticky;
  top: 0;
  z-index: 30;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

/* Mobile menu button */
.mobile-menu-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 50;
}

/* Desktop navigation */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.sign-in-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem;
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

.sign-in-button:hover {
  background-color: #2563eb;
  color: white;
}

.sign-out-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem;
  background-color: transparent;
  border: 1px solid #4b5563;
  color: #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s;
}

.sign-out-button:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.main-content {
  flex: 1;
}

/* Utility classes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.hidden {
  display: none;
}

.block {
  display: block;
}

/* Media queries */
@media (min-width: 768px) {
  .md\:hidden {
    display: none;
  }

  .md\:flex {
    display: flex;
  }

  .md\:block {
    display: block;
  }
}
</style>