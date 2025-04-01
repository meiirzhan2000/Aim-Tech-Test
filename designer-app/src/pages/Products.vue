<template>
  <div class="section bg-gray-900">
    <div class="container mx-auto max-w-6xl px-4">
      <!-- Header Section with improved styling -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Products</h1>
          <p class="text-gray-400">Manage and organize your design assets</p>
        </div>
        
        <router-link 
          to="/products/create" 
          class="btn-primary flex items-center space-x-2 px-5 py-3 rounded-lg transition transform hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Product</span>
        </router-link>
      </div>
      
      <!-- Search and Filter Bar with improved UI -->
      <div class="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow">
            <base-input
              id="searchProducts"
              v-model="searchQuery"
              placeholder="Search products..."
              icon-left
            >
            </base-input>
          </div>
          
          <!-- Additional filters could be added here -->
          <div class="flex gap-2">
            <select 
              v-model="sortOption" 
              @change="sortProducts"
              class="form-input bg-gray-700 text-white border-gray-600 cursor-pointer"
            >
              <option value="newest">Recently Added</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Products Grid/Table with improved styling -->
      <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p class="ml-4 text-gray-400">Loading products...</p>
        </div>
        
        <div v-else-if="filteredProducts.length === 0" class="py-16 px-4">
          <base-empty-state
            title="No products found"
            message="Get started by creating a new product or change your search query."
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </template>
            <template #action>
              <router-link to="/products/create" class="btn-primary px-5 py-3 rounded-lg inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Your First Product</span>
              </router-link>
            </template>
          </base-empty-state>
        </div>
        
        <div v-else>
          <!-- Desktop Table View -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-700 text-left">
                <tr>
                  <th class="px-6 py-4 text-gray-300 font-medium">Product</th>
                  <th class="px-6 py-4 text-gray-300 font-medium">Description</th>
                  <th class="px-6 py-4 text-gray-300 font-medium">Price</th>
                  <th class="px-6 py-4 text-gray-300 font-medium">Date Added</th>
                  <th class="px-6 py-4 text-gray-300 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-700 transition">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-white">{{ product.name }}</div>
                    <div v-if="product.category" class="text-xs text-gray-400 mt-1">{{ formatCategory(product.category) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-300 line-clamp-2">{{ product.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium">
                      <span class="px-3 py-1 rounded-full bg-blue-500 bg-opacity-20 text-blue-400">
                        ${{ product.price.toFixed(2) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-400">{{ formatDate(product.createdAt) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      class="text-white bg-blue-500 hover:bg-blue-600 transition px-3 py-1.5 rounded mr-2"
                      @click="editProduct(product)"
                    >
                      Edit
                    </button>
                    <button 
                      class="text-white bg-red-500 hover:bg-red-600 transition px-3 py-1.5 rounded"
                      @click="confirmDelete(product)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Mobile Card View - Better for small screens -->
          <div class="md:hidden divide-y divide-gray-700">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id" 
              class="p-4 hover:bg-gray-700"
            >
              <div class="flex justify-between mb-2">
                <div>
                  <h3 class="font-medium text-white">{{ product.name }}</h3>
                  <div v-if="product.category" class="text-xs text-gray-400 mt-1">{{ formatCategory(product.category) }}</div>
                </div>
                <span class="price-tag px-2 py-1 rounded-full bg-blue-500 bg-opacity-20 text-blue-400 text-sm">
  ${{ product.price.toFixed(2) }}
</span>
              </div>
              <p class="text-sm text-gray-300 mb-2 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400">{{ formatDate(product.createdAt) }}</span>
                <div class="flex space-x-2">
                  <button 
                    class="text-white bg-blue-500 hover:bg-blue-600 transition px-2 py-1 rounded text-xs"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button 
                    class="text-white bg-red-500 hover:bg-red-600 transition px-2 py-1 rounded text-xs"
                    @click="confirmDelete(product)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination - New feature -->
      <div v-if="filteredProducts.length > 0" class="mt-6 flex justify-between items-center">
        <div class="text-sm text-gray-400">
          Showing <span class="font-medium text-white">{{ filteredProducts.length }}</span> {{ filteredProducts.length === 1 ? 'product' : 'products' }}
        </div>
      </div>
    </div>
      
    <!-- Delete Confirmation Modal - With improved styling -->
    <base-modal v-model="showDeleteModal" title="Confirm Deletion">
      <div class="p-1">
        <div class="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span class="text-white font-medium">You're about to delete this product</span>
          </div>
        </div>
        
        <p class="text-gray-300 mb-6">
          Are you sure you want to delete <span class="font-medium text-white">{{ productToDelete?.name }}</span>? This action cannot be undone.
        </p>
        
        <div class="flex justify-end space-x-4">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            Cancel
          </button>
          <button 
            @click="deleteProduct"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition flex items-center"
            :disabled="deleteLoading"
          >
            <svg v-if="deleteLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Product
          </button>
        </div>
      </div>
    </base-modal>
      
    <!-- Edit Modal - With improved styling -->
    <base-modal v-model="showEditModal" title="Edit Product">
      <form v-if="editingProduct" @submit.prevent="updateProduct" class="space-y-5">
        <div>
          <base-input
            id="editName"
            v-model="editingProduct.name"
            label="Product Name"
            required
          />
          <p v-if="editErrors.name" class="mt-1 text-sm text-red-400">{{ editErrors.name }}</p>
        </div>
          
        <div>
          <label for="editDescription" class="form-label flex justify-between">
            <span>Description</span>
            <span class="text-sm text-gray-400">
              {{ editingProduct.description.length }}/500 characters
            </span>
          </label>
          <textarea
            id="editDescription"
            v-model="editingProduct.description"
            rows="4"
            maxlength="500"
            class="form-input w-full bg-gray-700 border-gray-600 focus:border-blue-500 text-white resize-none"
            required
          ></textarea>
          <p v-if="editErrors.description" class="mt-1 text-sm text-red-400">{{ editErrors.description }}</p>
        </div>
          
        <div>
          <base-input
            id="editPrice"
            v-model.number="editingProduct.price"
            type="number"
            label="Price ($)"
            min="0"
            step="0.01"
            required
          />
          <p v-if="editErrors.price" class="mt-1 text-sm text-red-400">{{ editErrors.price }}</p>
        </div>

        <!-- Category dropdown in edit modal -->
        <div>
          <label for="editCategory" class="form-label">Category</label>
          <select
            id="editCategory"
            v-model="editingProduct.category"
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

        <!-- Tags in edit modal -->
        <div>
          <label class="form-label">Tags</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <div 
              v-for="(tag, index) in editTags" 
              :key="index"
              class="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <span>{{ tag }}</span>
              <button 
                type="button" 
                class="ml-2 text-blue-300 hover:text-blue-100 focus:outline-none"
                @click="removeEditTag(index)"
              >
                ×
              </button>
            </div>
          </div>
          <div class="flex">
            <input
              v-model="editTagInput"
              type="text"
              class="form-input flex-grow bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
              placeholder="Add a tag and press Enter"
              @keydown.enter.prevent="addEditTag"
            />
            <button 
              type="button"
              class="ml-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded"
              @click="addEditTag"
            >
              Add
            </button>
          </div>
        </div>
          
        <div class="flex justify-end space-x-4 pt-4">
          <button 
            type="button" 
            @click="showEditModal = false"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition flex items-center"
            :disabled="updateLoading"
          >
            <svg v-if="updateLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      </form>
    </base-modal>
    
    <!-- Success Notification Toast -->
    <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center animate-fade-in-up z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <div>
        <div class="font-medium">{{ toastMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
  
// Import UI components
import BaseInput from '../components/UI/BaseInput.vue';
import BaseModal from '../components/UI/BaseModal.vue';
import BaseEmptyState from '../components/UI/BaseEmptyState.vue';
  
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  tags?: string[];
  createdAt: Timestamp;
  userId: string;
}
  
export default defineComponent({
  name: 'ProductsPage',
  components: {
    BaseInput,
    BaseModal,
    BaseEmptyState
  },
  setup() {
    const authStore = useAuthStore();
    const loading = ref(true);
    const updateLoading = ref(false);
    const deleteLoading = ref(false);
    const products = ref<Product[]>([]);
    const searchQuery = ref('');
    const sortOption = ref('newest');
      
    // Modal state
    const showDeleteModal = ref(false);
    const showEditModal = ref(false);
    const productToDelete = ref<Product | null>(null);
    const editingProduct = ref<Product | null>(null);
    const editTags = ref<string[]>([]);
    const editTagInput = ref('');
    const editErrors = ref({
      name: '',
      description: '',
      price: ''
    });
    
    // Toast notification
    const showToast = ref(false);
    const toastMessage = ref('');
      
    // Filtered products based on search query
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return products.value;
        
      const query = searchQuery.value.toLowerCase();
      return products.value.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });
    
    // Sort products
    const sortProducts = () => {
      switch (sortOption.value) {
        case 'newest':
          products.value.sort((a, b) => 
            b.createdAt.toMillis() - a.createdAt.toMillis()
          );
          break;
        case 'oldest':
          products.value.sort((a, b) => 
            a.createdAt.toMillis() - b.createdAt.toMillis()
          );
          break;
        case 'price-high':
          products.value.sort((a, b) => b.price - a.price);
          break;
        case 'price-low':
          products.value.sort((a, b) => a.price - b.price);
          break;
        case 'name':
          products.value.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    };
      
    // Fetch products from Firestore
    const fetchProducts = async () => {
      loading.value = true;
        
      try {
        const user = authStore.currentUser;
        if (!user) return;
          
        const q = query(
          collection(db, 'products'),
          where('userId', '==', user.uid)
        );
          
        const querySnapshot = await getDocs(q);
        const fetchedProducts: Product[] = [];
          
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({
            id: doc.id,
            ...doc.data()
          } as Product);
        });
        
        products.value = fetchedProducts;
        sortProducts(); // Apply initial sort
        
      } catch (error) {
        console.error('Error fetching products:', error);
        showToastMessage('Failed to load products', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // Format category
    const formatCategory = (category: string): string => {
      if (!category) return '';
      return category.charAt(0).toUpperCase() + category.slice(1);
    };
      
    // Format date for display
    const formatDate = (timestamp: Timestamp) => {
      if (!timestamp || !timestamp.toDate) {
        return 'N/A';
      }
      const date = timestamp.toDate();
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    };
    
    // Tag management for editing
    const addEditTag = () => {
      const tag = editTagInput.value.trim();
      if (tag && !editTags.value.includes(tag)) {
        editTags.value.push(tag);
        editTagInput.value = '';
      }
    };
    
    const removeEditTag = (index: number) => {
      editTags.value.splice(index, 1);
    };
      
    // Edit product
    const editProduct = (product: Product) => {
      editingProduct.value = { ...product };
      editTags.value = product.tags ? [...product.tags] : [];
      editErrors.value = { name: '', description: '', price: '' };
      showEditModal.value = true;
    };
    
    // Validate edit form
    const validateEditForm = (): boolean => {
      let isValid = true;
      editErrors.value = { name: '', description: '', price: '' };
      
      if (!editingProduct.value!.name.trim()) {
        editErrors.value.name = 'Product name is required';
        isValid = false;
      } else if (editingProduct.value!.name.length < 3) {
        editErrors.value.name = 'Product name must be at least 3 characters';
        isValid = false;
      }
      
      if (!editingProduct.value!.description.trim()) {
        editErrors.value.description = 'Product description is required';
        isValid = false;
      } else if (editingProduct.value!.description.length < 20) {
        editErrors.value.description = 'Please provide a more detailed description (at least 20 characters)';
        isValid = false;
      }
      
      if (!editingProduct.value!.price || editingProduct.value!.price <= 0) {
        editErrors.value.price = 'Please enter a valid price';
        isValid = false;
      }
      
      return isValid;
    };
      
    // Update product
    const updateProduct = async () => {
      if (!editingProduct.value) return;
      if (!validateEditForm()) return;
      
      updateLoading.value = true;
        
      try {
        const productRef = doc(db, 'products', editingProduct.value.id);
          
        await updateDoc(productRef, {
          name: editingProduct.value.name,
          description: editingProduct.value.description,
          price: editingProduct.value.price,
          category: editingProduct.value.category || 'other',
          tags: editTags.value,
          updatedAt: serverTimestamp()
        });
          
        // Update local product in the array
        const index = products.value.findIndex(p => p.id === editingProduct.value!.id);
        if (index !== -1) {
          products.value[index] = {
            ...products.value[index],
            name: editingProduct.value.name,
            description: editingProduct.value.description,
            price: editingProduct.value.price,
            category: editingProduct.value.category,
            tags: editTags.value
          };
        }
          
        // Close modal and show success message
        showEditModal.value = false;
        showToastMessage('Product updated successfully');
      } catch (error) {
        console.error('Error updating product:', error);
        showToastMessage('Failed to update product', 'error');
      } finally {
        updateLoading.value = false;
      }
    };
      
    // Confirm delete
    const confirmDelete = (product: Product) => {
      productToDelete.value = product;
      showDeleteModal.value = true;
    };
      
    // Delete product
    const deleteProduct = async () => {
      if (!productToDelete.value) return;
      
      deleteLoading.value = true;
        
      try {
        await deleteDoc(doc(db, 'products', productToDelete.value.id));
          
        // Remove from local array
        products.value = products.value.filter(p => p.id !== productToDelete.value?.id);
          
        // Close modal and show success message
        showDeleteModal.value = false;
        showToastMessage('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        showToastMessage('Failed to delete product', 'error');
      } finally {
        deleteLoading.value = false;
      }
    };
    
    // @ts-ignore
    const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
      toastMessage.value = message;
      showToast.value = true;
      
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };
      
    // Load products on mount
    onMounted(() => {
      fetchProducts();
    });
      
    return {
      loading,
      updateLoading,
      deleteLoading,
      products,
      searchQuery,
      filteredProducts,
      sortOption,
      sortProducts,
      showDeleteModal,
      showEditModal,
      productToDelete,
      editingProduct,
      editTags,
      editTagInput,
      editErrors,
      showToast,
      toastMessage,
      formatDate,
      formatCategory,
      addEditTag,
      removeEditTag,
      editProduct,
      updateProduct,
      confirmDelete,
      deleteProduct,
      showToastMessage
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

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

/* Other custom styles */
.btn-primary {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
  transition: all 0.3s;
}

@media (max-width: 768px) {
  /* Improve price tag styling for mobile */
  .price-tag {
    font-size: 0.875rem;        /* Smaller font size */
    padding: 0.25rem 0.5rem;     /* More compact padding */
    margin-left: auto;           /* Push to right side */
    white-space: nowrap;         /* Prevent wrapping */
    min-width: 60px;             /* Minimum width */
    text-align: center;          /* Center the text */
    border-radius: 0.375rem;     /* Slightly less rounded corners */
    background-color: rgba(59, 130, 246, 0.15);  /* Lighter blue background */
  }
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px -1px rgba(59, 130, 246, 0.6);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Form input focus styles */
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
</style>