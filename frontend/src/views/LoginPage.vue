<template>
    <div class="min-h-screen">
        <!-- Logo and Call Us -->
        <div class="absolute top-0 left-0 right-0">
            <div class="container flex items-center justify-between px-12 py-6 mx-auto text-blue-600">
                <div class="text-2xl font-semibold tracking-tight">MAS POS</div>
                <div class="text-sm">Call Us +777777</div>
            </div>
        </div>

        <!-- Login Section -->
        <div class="flex items-center justify-center min-h-screen py-16">
            <div class="p-8 bg-white rounded-lg shadow-lg w-96">
                <h1 class="mb-6 text-lg font-medium text-center text-gray-800">Login</h1>

                <!-- Email Field -->
                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-left text-gray-700" for="email">Email</label>
                    <input v-model="email" type="email" id="email"
                        class="w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Enter your email" />
                </div>

                <!-- Password Field -->
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-left text-gray-700"
                        for="password">Password</label>
                    <div class="relative">
                        <input v-model="password" type="password" id="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter password" />
                    </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
                    {{ successMessage }}
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                    {{ errorMessage }}
                </div>

                <!-- Login Button -->
                <div class="flex justify-center">
                    <button @click="login" class="px-6 py-2 text-white bg-blue-700 rounded hover:bg-blue-800">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await api.login({
                    email: this.email,
                    password: this.password,
                });

                const { id, name, email, token } = response.data.data;

                const userData = {
                    id,
                    name,
                    email,
                    token
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                this.$router.push('/home');
            } catch (error) {
                this.errorMessage = 'Login failed. Please check your credentials and try again.';
                console.error('Login error:', error);
            }
        },
    },
};
</script>
