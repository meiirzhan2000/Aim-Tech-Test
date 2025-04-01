<template>
  <div v-if="authStore.authReady">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <div v-else class="loading-screen">
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore();

    onMounted(async () => {
      console.log('App mounted, starting auth listener');
      // Start listening for auth changes
      await authStore.listenForAuthChanges();
      console.log('Auth listener initialized, auth ready:', authStore.authReady);
    });

    return {
      authStore
    };
  }
});
</script>

<style>
.loading-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111827;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: white;
  font-size: 1.25rem;
}
</style>