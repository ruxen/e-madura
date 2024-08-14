<template>
    <div class="min-h-screen">
        <!-- Navigation Bar -->
        <NavbarAuth />

        <!-- Main Container -->
        <div class="items-center h-full max-w-3xl px-4 py-16 mx-auto mt-3 sm:px-20">
            <div class="flex items-center justify-center">
                <div class="w-full bg-white rounded-lg shadow-lg p-14">
                    <h1 class="mb-6 text-lg font-medium text-center text-gray-800">Add Product</h1>
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

                    <div class="flex mb-6">
                        <div class="w-1/3">
                            <div class="relative">
                                <div class="p-6 bg-blue-100 rounded-lg">
                                    <div v-bind="getRootProps()">
                                        <input v-bind="getInputProps()" />
                                    </div>
                                    <button @click="open">
                                        <svg viewBox="0 0 1024 1024" class="icon" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M768 810.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z"
                                                    fill="#3688FF"></path>
                                                <path
                                                    d="M640 789.3c-10.9 0-21.8-4.2-30.2-12.5L512 679l-97.8 97.8c-16.6 16.7-43.7 16.7-60.3 0-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0l128 128c16.7 16.7 16.7 43.7 0 60.3-8.4 8.4-19.3 12.5-30.2 12.5z"
                                                    fill="#5F6379"></path>
                                                <path
                                                    d="M512 960c-23.6 0-42.7-19.1-42.7-42.7V618.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v298.7c0 23.5-19.1 42.6-42.7 42.6z"
                                                    fill="#5F6379"></path>
                                            </g>
                                        </svg>
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="w-2/3 ml-6">
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-left text-gray-700"
                                    for="product-name">Product Name</label>
                                <input v-model="productName" type="text" id="product-name" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="Product Name" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-left text-gray-700"
                                    for="price">Price</label>
                                <input v-model.number="price" type="number" id="price" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="Input price" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-left text-gray-700"
                                    for="category">Select Category</label>
                                <select v-model.number="category" id="category" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                                    <option value="" disabled>Select category</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button @click="cancel"
                            class="px-6 py-2 mr-2 text-blue-700 bg-white border border-blue-700 rounded hover:bg-blue-50">
                            Cancel
                        </button>
                        <button @click="addProduct" class="px-6 py-2 text-white bg-blue-700 rounded hover:bg-blue-800">
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
import { ref } from 'vue';
import { useDropzone } from "vue3-dropzone";
import { useRouter } from 'vue-router';

export default {
    components: {
        NavbarAuth,
    },
    setup() {
        const productName = ref('');
        const price = ref('');
        const category = ref('');
        const categories = ref([]);
        const errorMessage = ref(null);
        const successMessage = ref(null);
        const uploadedFilePath = ref(null);
        const router = useRouter();

        const onDrop = (acceptedFiles) => {
            uploadedFilePath.value = acceptedFiles[0];
            // console.log(rejectReasons);
        };

        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

        const addProduct = async () => {
            try {
                if (!uploadedFilePath.value) {
                    errorMessage.value = 'Please upload an image first!';
                    successMessage.value = null;
                    return;
                }
                const formData = new FormData();
                formData.append('name', productName.value);
                formData.append('price', parseFloat(price.value));
                formData.append('category_id', parseInt(category.value));
                formData.append('image', uploadedFilePath.value);

                const response = await api.addProduct(formData);

                if (response.status === 201) {
                    successMessage.value = 'Product added successfully!';
                    errorMessage.value = null;
                    productName.value = '';
                    price.value = '';
                    category.value = '';
                    uploadedFilePath.value = null;
                }

            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    errorMessage.value = error.response.data.errors.map(err => err.message).join(', ');
                } else {
                    errorMessage.value = 'An unexpected error occurred.';
                }

                successMessage.value = null;
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await api.getCategories();
                categories.value = response.data.data;
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        function cancel() {
            router.push('/home');
        }

        fetchCategories();

        return {
            productName,
            price,
            category,
            categories,
            errorMessage,
            successMessage,
            uploadedFilePath,
            addProduct,
            getRootProps,
            getInputProps,
            cancel,
            ...rest,
        };
    },
};
</script>
