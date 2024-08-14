import axios from 'axios';

const apiServer = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiServer.interceptors.request.use((config) => {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const { token } = JSON.parse(userData);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return config;
});

export default {
    login(data) {
        return apiServer.post('/login', data);
    },
    getCategories() {
        return apiServer.get('/category');
    },
    addCategory(data) {
        return apiServer.post('/category', data);
    },
    getProductsByCategory(slug) {
        return apiServer.get(`/category/${slug}`);
    },
    addProduct(data) {
        return apiServer.post('/product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    placeOrder(data) {
        return apiServer.post('/order', data);
    },
};
