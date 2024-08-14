<template>
    <div class="min-h-screen">
        <!-- Navigation Bar -->
        <NavbarAuth />

        <!-- Main Container -->
        <div class="items-center h-full max-w-5xl px-4 py-16 mx-auto mt-3 sm:px-20">
            <div class="flex items-center justify-center">
                <div class="p-10 bg-white rounded-lg shadow-lg w-96">
                    <h1 class="mb-6 text-lg font-medium text-center text-gray-800">Add Category</h1>
                    <hr class="mb-6">

                    <!-- Success Message -->
                    <div v-if="successMessage"
                        class="p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
                        {{ successMessage }}
                    </div>

                    <!-- Error Message -->
                    <div v-if="errorMessage" class="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                        {{ errorMessage }}
                    </div>

                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-left text-gray-700" for="category">Category
                            Name</label>
                        <div class="relative">
                            <input v-model="name" type="text" id="name" required
                                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Category name" />
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-center">
                        <button @click="cancel"
                            class="px-6 py-2 mr-2 text-blue-700 bg-white border border-blue-700 rounded hover:bg-blue-50">
                            Cancel
                        </button>
                        <button @click="addCategory" class="px-6 py-2 text-white bg-blue-700 rounded hover:bg-blue-800">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';
import NavbarAuth from '../components/NavbarAuth.vue';

export default {
    components: {
        NavbarAuth,
    },
    data() {
        return {
            name: '',
            errorMessage: null,
            successMessage: null
        };
    },
    methods: {
        async addCategory() {
            try {
                const response = await api.addCategory({ name: this.name });

                if (response.status === 201) {
                    this.successMessage = 'Category added successfully!';
                    this.errorMessage = null;
                    this.name = '';
                }

            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.errorMessage = error.response.data.errors.map(err => err.message).join(', ');
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                }
                this.successMessage = null;
            }
        },
        cancel() {
            this.$router.push('/home');
        }
    }
};
</script>
