<template>
    <div class="min-h-screen">
        <!-- Navigation Bar -->
        <NavbarAuth />

        <!-- Main Container -->
        <div class="max-w-5xl px-4 mx-auto mt-3 sm:px-20">
            <!-- Right-aligned Buttons -->
            <MainMenu @view-cart="viewCart" />

            <!-- Category Tabs -->
            <CategoryTabs :categories="categories" :selectedCategory="selectedCategory"
                @select-category="selectCategory" />

            <!-- Products Grid -->
            <ProductLists :products="products" @add-to-cart="addToCart" />

            <span class="fixed px-4 py-2 text-white bg-blue-700 rounded bottom-4 right-48">
                Total Bill : Rp. {{ totalBill }}
            </span>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';
import NavbarAuth from '../components/NavbarAuth.vue';
import MainMenu from '../components/MainMenu.vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import ProductLists from '../components/ProductLists.vue';

export default {
    components: {
        NavbarAuth,
        MainMenu,
        CategoryTabs,
        ProductLists
    },
    data() {
        return {
            categories: [],
            selectedCategory: null,
            products: [],
            totalBill: 0,
            cart: []
        };
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await api.getCategories();
                this.categories = response.data.data;

                if (this.categories.length > 0) {
                    this.selectCategory(this.categories[0].slug);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        },
        async selectCategory(slug) {
            this.selectedCategory = slug;
            await this.fetchProducts(slug);
        },
        async fetchProducts(categorySlug) {
            try {
                const response = await api.getProductsByCategory(categorySlug);
                this.products = response.data.data[0].products;
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },
        addToCart(product) {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};

            if (cart[product.slug]) {
                cart[product.slug].quantity += 1;
            } else {
                cart[product.slug] = {
                    product: product,
                    quantity: 1
                };
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateTotalBill();
        },
        updateTotalBill() {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            this.totalBill = Object.values(cart).reduce((sum, item) => {
                return sum + (item.product.price * item.quantity);
            }, 0);
        },
        viewCart() {
            this.$router.push('/cart');
        }
    },
    async mounted() {
        this.fetchCategories();
        this.updateTotalBill();
    }
};
</script>
