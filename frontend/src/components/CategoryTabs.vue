<template>
    <div class="flex flex-wrap justify-center mt-8">
        <div class="flex flex-wrap justify-center space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category.slug)" :class="{
                'text-blue-600 border-blue-600': selectedCategory === category.slug,
                'text-gray-600 border-transparent': selectedCategory !== category.slug,
                'border-b-2': true
            }" class="px-4 py-2 text-sm font-medium transition-all duration-300 sm:text-base hover:border-blue-600">
                {{ category.name }}
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['categories', 'selectedCategory'],
    methods: {
        selectCategory(slug) {
            this.$emit('select-category', slug);
        }
    }
}
</script>
