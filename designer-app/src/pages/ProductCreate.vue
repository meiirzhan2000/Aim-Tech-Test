<template>
  <div class="section bg-gray-900">
    <div class="container mx-auto max-w-3xl px-4">
      <!-- Header with improved design and animation -->
      <div class="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Create Product</h1>
          <p class="text-gray-400">Add a new design product to your collection</p>
        </div>
        
        <router-link 
  to="/products" 
  class="back-button flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
  <span class="back-button-text">Back to Products</span>
</router-link>
      </div>
      
      <!-- Product Form Card with animation -->
      <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-slide-up">
        <div class="p-6 border-b border-gray-700">
          <h2 class="text-xl font-semibold text-white">Product Information</h2>
          <p class="text-gray-400 text-sm mt-1">Fill in the details of your new product</p>
        </div>
        
        <form @submit.prevent="createProduct" class="p-6 space-y-6">
          <!-- Product Name -->
          <div class="animate-fade-in" style="animation-delay: 100ms;">
            <base-input
              id="productName"
              v-model="productForm.name"
              label="Product Name"
              placeholder="Enter a descriptive name for your product"
              required
              :error="errors.name"
            />
          </div>
          
          <!-- Product Description with character count -->
          <div class="animate-fade-in" style="animation-delay: 200ms;">
            <label for="productDescription" class="form-label flex justify-between">
              <span>Product Description</span>
              <span class="text-sm text-gray-400">
                {{ productForm.description.length }}/500 characters
              </span>
            </label>
            <textarea
              id="productDescription"
              v-model="productForm.description"
              rows="4"
              maxlength="500"
              class="form-input w-full bg-gray-700 border-gray-600 focus:border-blue-500 text-white resize-none"
              placeholder="Describe your product in detail - include key features, specs, and what makes it special"
              required
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-400">{{ errors.description }}</p>
          </div>
          
          <!-- Price with Currency Symbol -->
          <div class="animate-fade-in" style="animation-delay: 300ms;">
            <base-input
              id="productPrice"
              v-model.number="productForm.price"
              type="number"
              label="Price ($)"
              placeholder="0.00"
              required
              min="0"
              step="0.01"
              :error="errors.price"
            >
              <template #prefix>
                <span class="text-gray-400">$</span>
              </template>
            </base-input>
            <p v-if="!errors.price" class="mt-1 text-sm text-gray-400">Set the price your customers will pay</p>
          </div>
          
          <!-- New: Product Category Dropdown -->
          <div class="animate-fade-in" style="animation-delay: 400ms;">
            <label for="productCategory" class="form-label">Category</label>
            <select
              id="productCategory"
              v-model="productForm.category"
              class="form-input w-full bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
            >
              <option value="" disabled>Select a category</option>
              <option value="graphics">Graphics</option>
              <option value="templates">Templates</option>
              <option value="fonts">Fonts</option>
              <option value="mockups">Mockups</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <!-- New: Tags Input -->
          <div class="animate-fade-in" style="animation-delay: 500ms;">
            <label for="productTags" class="form-label">Tags (Optional)</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div 
                v-for="(tag, index) in tags" 
                :key="index"
                class="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center animate-pop-in"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <span>{{ tag }}</span>
                <button 
                  type="button" 
                  class="ml-2 text-blue-300 hover:text-blue-100 focus:outline-none"
                  @click="removeTag(index)"
                >
                  ×
                </button>
              </div>
            </div>
            <div class="flex">
              <input
                id="productTags"
                v-model="tagInput"
                type="text"
                class="form-input flex-grow bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                placeholder="Add a tag and press Enter"
                @keydown.enter.prevent="addTag"
              />
              <button 
                type="button"
                class="ml-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded"
                @click="addTag"
              >
                Add
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-400">Tags make your product easier to discover</p>
          </div>
          
          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-4 animate-fade-in" style="animation-delay: 600ms;">
            <button 
              type="button" 
              class="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              @click="$router.push('/products')"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-blue pulse-animation"
              :disabled="loading"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Creating...' : 'Create Product' }}</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Info Card - Best Practices with animation -->
      <div class="mt-8 bg-blue-900 bg-opacity-30 rounded-xl p-6 border border-blue-800 animate-slide-up-delayed">
        <h3 class="text-lg font-medium text-blue-300 mb-3">Tips for Creating Great Products</h3>
        <ul class="space-y-2 text-blue-100">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Use a clear, descriptive name that helps customers understand what you're selling</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Include all relevant details in your description - dimensions, formats, etc.</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Add relevant tags to make your product easier to discover</span>
          </li>
        </ul>
      </div>
      
      <!-- Floating action button for quick actions -->
      <div class="fixed bottom-6 right-6 z-50">
        <button 
          @click="showQuickActionsPopup = !showQuickActionsPopup" 
          class="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center pulse-glow"
        >
          <svg v-if="!showQuickActionsPopup" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Quick actions popup menu -->
        <transition name="popup">
          <div v-if="showQuickActionsPopup" class="absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-xl p-3 w-48 border border-gray-700">
            <button 
              @click="templatePopup = true; showQuickActionsPopup = false" 
              class="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <span>Use Template</span>
            </button>
            <button 
              @click="fillSampleData(); showQuickActionsPopup = false"
              class="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded flex items-center space-x-2 mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Sample Data</span>
            </button>
            <button 
              @click="helpPopup = true; showQuickActionsPopup = false"
              class="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded flex items-center space-x-2 mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help</span>
            </button>
          </div>
        </transition>
      </div>
      
      <!-- Template Popup -->
      <transition name="fade">
        <div v-if="templatePopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-gray-800 rounded-xl max-w-lg w-full p-6 animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-white">Product Templates</h3>
              <button @click="templatePopup = false" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="space-y-4">
              <div @click="applyTemplate('graphics')" class="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition flex justify-between items-center">
                <div>
                  <h4 class="text-white font-medium">Graphics Template</h4>
                  <p class="text-gray-300 text-sm">Template for digital graphics and illustrations</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div @click="applyTemplate('fonts')" class="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition flex justify-between items-center">
                <div>
                  <h4 class="text-white font-medium">Font Template</h4>
                  <p class="text-gray-300 text-sm">Template for font and typography products</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div @click="applyTemplate('templates')" class="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition flex justify-between items-center">
                <div>
                  <h4 class="text-white font-medium">Website Template</h4>
                  <p class="text-gray-300 text-sm">Template for web design products</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button @click="templatePopup = false" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- Help Popup -->
      <transition name="fade">
        <div v-if="helpPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-gray-800 rounded-xl max-w-lg w-full p-6 animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-white">Product Creation Help</h3>
              <button @click="helpPopup = false" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="space-y-4 text-gray-300">
              <p>Creating a product is easy! Here's how to make the most of this form:</p>
              <div class="space-y-2">
                <div class="flex items-start">
                  <span class="text-blue-400 font-bold mr-2">1.</span>
                  <p>Fill in all required fields with detailed information about your product.</p>
                </div>
                <div class="flex items-start">
                  <span class="text-blue-400 font-bold mr-2">2.</span>
                  <p>Add tags to make your product more discoverable. Good tags include product type, style, and use cases.</p>
                </div>
                <div class="flex items-start">
                  <span class="text-blue-400 font-bold mr-2">3.</span>
                  <p>Use the template feature to quickly fill in common product details for specific categories.</p>
                </div>
                <div class="flex items-start">
                  <span class="text-blue-400 font-bold mr-2">4.</span>
                  <p>Remember to set a competitive price that reflects the value of your work.</p>
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button @click="helpPopup = false" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Got it!
              </button>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- Success Notification Toast -->
      <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center animate-toast-in z-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <div class="font-medium">Product created successfully!</div>
          <div class="text-sm text-green-100">Your new product has been added to your inventory</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Import UI components
import BaseInput from '../components/UI/BaseInput.vue';

export default defineComponent({
  name: 'ProductCreate',
  components: {
    BaseInput
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const loading = ref(false);
    const showSuccess = ref(false);
    
    // Form data
    const productForm = ref({
      name: '',
      description: '',
      price: 0,
      category: '',
    });
    
    // Tags functionality
    const tags = ref<string[]>([]);
    const tagInput = ref('');
    
    // Popup states
    const showQuickActionsPopup = ref(false);
    const templatePopup = ref(false);
    const helpPopup = ref(false);
    
    const addTag = () => {
      const tag = tagInput.value.trim();
      if (tag && !tags.value.includes(tag)) {
        tags.value.push(tag);
        tagInput.value = '';
      }
    };
    
    const removeTag = (index: number) => {
      tags.value.splice(index, 1);
    };
    
    // Form validation errors
    const errors = ref({
      name: '',
      description: '',
      price: ''
    });
    
    // Validate form
    const validateForm = () => {
      let isValid = true;
      errors.value = { name: '', description: '', price: '' };
      
      if (!productForm.value.name.trim()) {
        errors.value.name = 'Product name is required';
        isValid = false;
      } else if (productForm.value.name.length < 3) {
        errors.value.name = 'Product name must be at least 3 characters';
        isValid = false;
      }
      
      if (!productForm.value.description.trim()) {
        errors.value.description = 'Product description is required';
        isValid = false;
      } else if (productForm.value.description.length < 20) {
        errors.value.description = 'Please provide a more detailed description (at least 20 characters)';
        isValid = false;
      }
      
      if (!productForm.value.price || productForm.value.price <= 0) {
        errors.value.price = 'Please enter a valid price';
        isValid = false;
      }
      
      return isValid;
    };
    
    // Create product
    const createProduct = async () => {
      if (!validateForm()) return;
      
      loading.value = true;
      
      try {
        const user = authStore.currentUser;
        if (!user) {
          router.push('/auth');
          return;
        }
        
        // Add document to Firestore
        await addDoc(collection(db, 'products'), {
          name: productForm.value.name,
          description: productForm.value.description,
          price: productForm.value.price,
          category: productForm.value.category || 'other',
          tags: tags.value,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
        
        // Show success message
        showSuccess.value = true;
        setTimeout(() => {
          showSuccess.value = false;
          // Navigate to products page after showing success message
          router.push('/products');
        }, 3000);
        
        // Reset form
        productForm.value = {
          name: '',
          description: '',
          price: 0,
          category: '',
        };
        tags.value = [];
        
      } catch (error: any) {
        console.error('Error creating product:', error);
        // Could add error handling UI here
      } finally {
        loading.value = false;
      }
    };
    
    // Fill sample data based on template
    const applyTemplate = (templateType: string) => {
      templatePopup.value = false;
      
      if (templateType === 'graphics') {
        productForm.value = {
          name: 'Premium Vector Icons Pack',
          description: 'A collection of 50 high-quality vector icons suitable for web and mobile applications. Includes formats: SVG, PNG, AI. All icons are fully customizable and can be scaled to any size without losing quality.',
          price: 29.99,
          category: 'graphics',
        };
        tags.value = ['icons', 'vector', 'ui', 'design', 'svg'];
      } else if (templateType === 'fonts') {
        productForm.value = {
          name: 'Elegance Pro Serif Font',
          description: 'An elegant serif font with modern touches. Perfect for branding, editorial design, and luxury products. Includes 6 weights from Light to Black, plus italics. Compatible with Windows and Mac.',
          price: 39.99,
          category: 'fonts',
        };
        tags.value = ['font', 'serif', 'typography', 'branding', 'elegant'];
      } else if (templateType === 'templates') {
        productForm.value = {
          name: 'Minimalist Portfolio Website Template',
          description: 'Clean and responsive portfolio template for creatives and designers. Built with HTML5, CSS3, and JavaScript. Features include project showcase, contact form, and about section. Fully responsive and easy to customize.',
          price: 49.99,
          category: 'templates',
        };
        tags.value = ['website', 'portfolio', 'responsive', 'minimalist', 'template'];
      }
    };
    
    // Fill with quick sample data
    const fillSampleData = () => {
      productForm.value = {
        name: 'Sample Design Product',
        description: 'This is a sample product description that highlights the key features and benefits of this product. Ideal for testing the product creation functionality.',
        price: 19.99,
        category: 'other',
      };
      tags.value = ['sample', 'test', 'demo'];
    };
    
    return {
      loading,
      productForm,
      errors,
      showSuccess,
      tags,
      tagInput,
      addTag,
      removeTag,
      createProduct,
      showQuickActionsPopup,
      templatePopup,
      helpPopup,
      applyTemplate,
      fillSampleData
    };
  }
});
</script>

<style scoped>
/* Animation for the toast notification */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

.animate-slide-up-delayed {
  animation: slide-up 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes toast-in {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-toast-in {
  animation: toast-in 0.5s ease-out forwards;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-pop-in {
  animation: pop-in 0.4s ease-out forwards;
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 640px) {
  .back-button-text {
    display: none;
  }
  
  /* Adjust the button to be icon-only */
  .back-button {
    padding: 0.5rem;
    border-radius: 0.375rem;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

/* Popup animations */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Fade animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Form focus styling */
.form-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

/* Input styling extensions */
.form-input::placeholder {
  color: #6b7280;
}

/* Transition effects */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Pulse animation for create button */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

/* Floating action button glow effect */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
}

.pulse-glow {
  animation: glow 3s infinite;
}

/* Shadow effect for buttons */
.hover\:shadow-blue:hover {
  box-shadow: 0 8px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
}

</style>