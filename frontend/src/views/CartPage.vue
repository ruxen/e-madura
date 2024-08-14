<template>
    <div class="min-h-screen">
        <!-- Navigation Bar -->
        <NavbarAuth />
        <div class="max-w-6xl mx-auto mt-8 mb-6">
            <!-- Check if there are no items in the cart -->
            <div v-if="cart.length === 0" class="py-8 text-center text-gray-600">
                <p>Your cart is empty.</p>
            </div>

            <!-- Display cart items if available -->
            <div v-else class="p-6 space-y-4 bg-white rounded-lg shadow-lg">
                <div v-for="item in cart" :key="item.id" class="flex items-center space-x-6">
                    <div class="w-24 h-24">
                        <img :src="getImageUrl(item.image)" alt="Product Image"
                            class="object-cover w-full h-full rounded-lg">
                    </div>
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
                        <p class="font-bold text-blue-600">Rp. {{ item.price }}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button @click="decreaseQuantity(item)"
                            class="px-2 py-1 text-white bg-blue-600 rounded-lg">-</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item)"
                            class="px-2 py-1 text-white bg-blue-600 rounded-lg">+</button>
                    </div>
                    <div class="w-20 text-right">
                        <p class="font-semibold">Rp. {{ item.price * item.quantity }}</p>
                    </div>
                    <button @click="removeItem(item.id)" class="px-4 py-2 text-white bg-red-600 rounded-lg">Remove
                        Item</button>
                </div>
                <div class="mt-6 text-xl font-bold text-right">
                    Total: Rp. {{ totalBill }}
                </div>
            </div>
            <div class="flex justify-end mt-8">
                <button @click="backToHome" class="px-4 py-2 mr-2 text-blue-600 border border-blue-600 rounded-lg">Back
                    to
                    Home</button>
                <button @click="payBill" class="px-4 py-2 text-white bg-blue-600 rounded-lg">Pay Bill</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarAuth from '../components/NavbarAuth.vue';

export default {
    components: {
        NavbarAuth,
    },
    data() {
        return {
            cart: [],
            totalBill: 0
        };
    },
    methods: {
        getImageUrl(imagePath) {
            return `${process.env.VUE_APP_BACKEND_URL}/${imagePath}`;
        },
        updateCart() {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.totalBill = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.updateCart();
            }
        },
        increaseQuantity(item) {
            item.quantity++;
            this.updateCart();
        },
        removeItem(itemId) {
            this.cart = this.cart.filter(item => item.id !== itemId);
            this.updateCart();
        },
        backToHome() {
            this.$router.push('/home');
        },
        payBill() {

        }
    },
    created() {
        this.updateCart();
    }
}
</script>
