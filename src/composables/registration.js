import { ref } from 'vue'
import http from "../http.js"
import { useRouter} from 'vue-router'

export default function useRegistration() {
    const errors = ref([])
    const router = useRouter()

    const registerUser = async (data) => {
        errors.value = []

        try {
            await http.post('/api/v1/registration', data)
            await router.push({ name: 'notice' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]);
                }
            }
        }
    }

    const verifyUser = async (token) => {
        try {
            await http.get(`/api/v1/registration/verification/${token}`)
        } finally {
            await router.push({ name: 'login' })
        }
    }

    return {
        errors,
        router,
        registerUser,
        verifyUser,
    }
}
