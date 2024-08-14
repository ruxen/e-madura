<template>
    <div class="grid max-w-6xl grid-cols-2 gap-4 mx-auto mt-8 mb-6 sm:grid-cols-3 lg:grid-cols-4">
        <div v-if="products.length === 0" class="py-8 text-center text-gray-600 col-span-full">
            <p>No products available.</p>
        </div>

        <div v-for="product in products" :key="product.id" class="p-4 bg-white rounded-lg shadow-lg">
            <img :src="getImageUrl(product.image)" alt="Product Image" class="object-cover w-full h-40 rounded-t-lg">
            <div class="mt-4">
                <h3 class="font-semibold text-gray-800">{{ product.name }}</h3>
                <p class="mt-1 font-bold text-blue-600">Rp. {{ product.price }}</p>
            </div>
            <div class="flex items-center justify-center mt-4">
                <button @click="addToCart(product)" class="px-3 py-2 text-sm text-white bg-blue-500 rounded">+ Add to
                    Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['products'],
    methods: {
        getImageUrl(imagePath) {
            return `${this.backendUrl}/${imagePath}`;
        },
        addToCart(product) {
            this.$emit('add-to-cart', product);
        }
    },
    computed: {
        backendUrl() {
            return process.env.VUE_APP_BACKEND_URL;
        }
    }
}
</script>
