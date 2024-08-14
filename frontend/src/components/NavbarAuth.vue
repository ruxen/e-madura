<template>
    <nav class="flex flex-wrap items-center justify-between w-full h-24 px-4 bg-blue-700 sm:px-8">
        <router-link to="/home" class="text-xl font-semibold text-white">
            MASPOS
        </router-link>
        <!-- Dropdown Logout -->
        <div class="relative flex items-center mt-4 ml-0 sm:ml-4 sm:mt-0">
            <span class="mr-2 text-white">{{ userName }}</span>
            <div @click="toggleDropdown" class="w-10 h-10 bg-white rounded-full cursor-pointer"></div>
            <div v-if="dropdownOpen" class="absolute right-0 z-10 w-32 mt-20 bg-white rounded shadow-lg">
                <button @click="logout"
                    class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            dropdownOpen: false
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        logout() {
            try {
                localStorage.removeItem('userData');
                this.$router.push('/login');
            } catch (error) {
                console.error('Failed to log out:', error);
            }
        }
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user && user.name) {
            this.userName = user.name;
        }
    }
}
</script>
