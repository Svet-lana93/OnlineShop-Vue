import {createRouter} from "vue-router/dist/vue-router";
import {createWebHistory} from "vue-router/dist/vue-router";
import ProductsIndex from "../components/products/ProductsIndex.vue";
import ProductsDetails from "../components/products/ProductsDetails.vue";
import Registration from "../components/registration/Registration.vue";
import VerificationEmail from "../components/registration/VerificationEmail.vue";
import Notice from "../components/registration/Notice.vue";
import Login from "../components/auth/Login.vue";
import OrdersCreate from "../components/orders/OrdersCreate.vue";
import OrdersStory from "../components/orders/OrdersStory.vue";

const isNotAuthenticated = (to, from, next) => {
    if (!!localStorage.getItem('user-token')) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/products',
        name: 'products.index',
        component: ProductsIndex,
    },
    {
        path: '/products/:id',
        name: 'products.details',
        props: true,
        component: ProductsDetails
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/registration/verification/:token',
        name: 'registration.verification',
        props: true,
        component: VerificationEmail
    },
    {
        path: '/registration/verification',
        name: 'notice',
        component: Notice
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/orders/create/:id',
        name: 'create',
        props: true,
        component: OrdersCreate,
        beforeEnter: isNotAuthenticated,
    },
    {
        path: '/orders/story',
        name: 'orders.story',
        component: OrdersStory,
        beforeEnter: isNotAuthenticated,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
})
