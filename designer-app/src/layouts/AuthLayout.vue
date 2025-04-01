<template>
  <div class="auth-layout">
    <AuthCard>
      <template #title>Welcome</template>
      <template #subtitle>Manage your design business efficiently</template>
      
      <router-view />
    </AuthCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthCard from '../components/layout/AuthCard.vue';

export default defineComponent({
  name: 'AuthLayout',
  components: {
    AuthCard
  }
});
</script>

<style>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #111827;
  background-image: radial-gradient(#1f2937 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Global styles for form elements within Auth pages */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"] {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(55, 65, 81, 1);
  border-radius: 0.375rem;
  color: white;
  font-size: 1rem;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="tel"]::placeholder {
  color: rgba(156, 163, 175, 0.5);
}

button {
  cursor: pointer;
}
</style>