<template>
    <div class="min-h-screen">
        <!-- Navigation Bar -->
        <NavbarAuth />
        <div class="max-w-6xl px-16 py-10 mx-auto">
            <div v-if="Object.keys(cart).length === 0" class="py-8 text-center text-gray-600">
                <p>Your cart is empty.</p>
            </div>

            <div v-else class="p-6 bg-white rounded-lg shadow-lg">
                <div class="grid grid-cols-1 gap-6">
                    <div v-for="(item, id) in cart" :key="id"
                        class="grid items-center grid-cols-5 p-4 border rounded-lg shadow-sm">
                        <div class="w-24 h-24">
                            <img :src="getImageUrl(item.product.image)" alt="Product Image"
                                class="object-cover w-full h-full rounded-lg">
                        </div>

                        <div class="flex flex-col">
                            <h3 class="font-semibold text-left text-gray-800">{{ item.product.name }}</h3>
                            <p class="font-bold text-left text-blue-600">Rp. {{ item.product.price }}</p>
                        </div>

                        <div class="flex items-center justify-center space-x-2">
                            <button @click="decreaseQuantity(id)"
                                class="px-2 py-1 text-white bg-blue-600 rounded-lg">-</button>
                            <span class="w-16">{{ item.quantity }}</span>
                            <button @click="increaseQuantity(id)"
                                class="px-2 py-1 text-white bg-blue-600 rounded-lg">+</button>
                        </div>

                        <div class="text-right">
                            <p class="font-semibold">Rp. {{ item.product.price * item.quantity }}</p>
                        </div>

                        <div class="text-right">
                            <button @click="removeItem(id)" class="px-4 py-2 text-white bg-red-600 rounded-lg">Remove
                                Item</button>
                        </div>
                    </div>
                </div>

                <div class="mt-6 text-xl font-bold text-right">
                    Total: Rp. {{ totalBill }}
                </div>
            </div>

            <!-- Success Modal -->
            <div v-if="showSuccessModal"
                class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div class="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
                    <h2 class="text-lg font-semibold text-gray-800">Payment Successful!</h2>
                    <div class="flex justify-center mt-4">
                        <div class="flex items-center justify-center w-20 h-20 bg-green-600 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p class="mt-4 text-gray-600">Total: Rp. {{ totalBill }}</p>
                    <button @click="backToHome" class="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg">
                        Back to Home
                    </button>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                {{ errorMessage }}
            </div>


            <div class="flex justify-end mt-8">
                <button @click="backToHome" class="px-4 py-2 mr-2 text-blue-600 border border-blue-600 rounded-lg">Back
                    to
                    Home</button>
                <button @click="payBill" :disabled="Object.keys(cart).length === 0"
                    class="px-4 py-2 text-white bg-blue-600 rounded-lg">
                    Pay Bill
                </button>
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
            cart: {},
            totalBill: 0,
            successMessage: null,
            errorMessage: null,
            showSuccessModal: false
        };
    },
    methods: {
        getImageUrl(imagePath) {
            return `${process.env.VUE_APP_BACKEND_URL}/${imagePath}`;
        },
        updateCart() {
            this.cart = JSON.parse(localStorage.getItem('cart')) || {};
            this.totalBill = Object.values(this.cart).reduce((sum, item) =>
                sum + (item.product.price * item.quantity), 0
            );
        },
        decreaseQuantity(id) {
            if (this.cart[id].quantity > 1) {
                this.cart[id].quantity--;
                this.updateLocalStorage();
            }
        },
        increaseQuantity(id) {
            this.cart[id].quantity++;
            this.updateLocalStorage();
        },
        removeItem(id) {
            delete this.cart[id];
            this.updateLocalStorage();
        },
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCart();
        },
        backToHome() {
            this.$router.push('/home');
        },
        async payBill() {
            if (Object.keys(this.cart).length === 0) {
                this.errorMessage = 'Your cart is empty. Add items to your cart before proceeding.';
                return;
            }

            const orderData = {
                user_id: parseInt(JSON.parse(localStorage.getItem('userData')).id),
                total: parseFloat(this.totalBill),
                items: Object.keys(this.cart).map(id => ({
                    product_id: parseInt(this.cart[id].product.id),
                    quantity: parseInt(this.cart[id].quantity)
                }))
            };

            try {
                const response = await api.placeOrder(orderData);

                if (response.status === 201) {
                    this.successMessage = 'Order placed successfully!';
                    this.errorMessage = null;
                    localStorage.removeItem('cart');
                    this.updateCart();
                    this.showSuccessModal = true;

                    setTimeout(() => {
                        this.backToHome();
                    }, 3000);
                } else {
                    this.errorMessage = 'Failed to place order.';
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.errorMessage = error.response.data.errors.map(err => err.message).join(', ');
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                }
                this.successMessage = null;
            }
        }
    },
    created() {
        this.updateCart();
    }
}
</script>
