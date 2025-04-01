<template>
  <div class="auth-container">
    <div class="auth-tabs">
      <button 
        @click="isLogin = true" 
        :class="['auth-tab', isLogin ? 'active' : '']"
      >
        Sign In
      </button>
      <button 
        @click="isLogin = false" 
        :class="['auth-tab', !isLogin ? 'active' : '']"
      >
        Create Account
      </button>
    </div>

    <div class="auth-forms">
      <!-- Login Form -->
      <LoginForm v-if="isLogin" @success="handleSuccess" />
      
      <!-- Register Form -->
      <RegisterForm v-else @success="handleSuccess" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/auth/LogicForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';
import { useToast } from '../composables/useToast';

export default defineComponent({
  name: 'AuthPage',
  components: {
    LoginForm,
    RegisterForm
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const isLogin = ref(true);
    
    const handleSuccess = () => {
      const message = isLogin.value ? 
        'You have been successfully logged in' : 
        'Your account has been created successfully';
        
      toast.success(message);
      router.push('/profile');
    };
    
    return {
      isLogin,
      handleSuccess
    };
  }
});
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

.auth-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-tab {
  padding: 0.75rem 1rem;
  margin: 0 0.5rem;
  color: rgba(156, 163, 175, 1);
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.auth-tab:hover {
  color: rgba(209, 213, 219, 1);
}

.auth-tab.active {
  color: #3b82f6;
}

.auth-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #3b82f6;
  border-radius: 2px 2px 0 0;
}

.auth-forms {
  margin-top: 1.5rem;
}
</style>