<template>
    <div class="flex flex-wrap items-center justify-end space-y-2 sm:space-y-0">
        <button @click="goToAddCategory"
            class="w-full px-4 py-2 mr-0 text-blue-900 bg-blue-200 rounded sm:mr-4 sm:w-auto">
            + Add Category
        </button>
        <button @click="goToAddProduct"
            class="w-full px-4 py-2 mr-0 text-blue-900 bg-blue-200 rounded sm:mr-4 sm:w-auto">
            + Add Products
        </button>
        <button @click="viewCart" class="w-full px-4 py-2 text-white bg-blue-700 rounded sm:w-auto">Cart</button>
    </div>
</template>

<script>
export default {
    methods: {
        goToAddCategory() {
            this.$router.push('/category');
        },
        goToAddProduct() {
            this.$router.push('/product');
        },
        viewCart() {
            this.$emit('view-cart');
        }
    }
}
</script>
