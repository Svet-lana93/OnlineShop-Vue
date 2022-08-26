import { ref } from 'vue'
import http from "../http.js"
import { useRouter} from 'vue-router'

export default function useOrders() {
    const user = ref([])
    const userOrders = ref([])

    const token = localStorage.getItem('user-token')

    const errors = ref([])
    const router = useRouter()

    const createOrder = async (data) => {
        errors.value = []

        try {
            await http.post('/api/v1/orders/create', data)
            await router.push({ name: 'orders.story' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]);
                }
            }
        }
    }

    const getAuthUser = async (token) => {
        errors.value = []

        try {
            let response = await http.get(`/api/v1/auth/user/${token}`)
            user.value = response.data.data
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]);
                }
            }
        }
    }

    const getUserOrders = async (id) => {
        let response = await http.get(`/api/v1/orders/story/${id}`)
        userOrders.value = response.data.data
    }

    return {
        errors,
        createOrder,
        getAuthUser,
        user,
        userOrders,
        getUserOrders,
        token
    }
}
