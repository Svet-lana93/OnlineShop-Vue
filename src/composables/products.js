import { ref } from 'vue'
import http from "../http.js"
import { useRouter} from 'vue-router'

export default function useProducts() {
    const product = ref([])
    const products = ref([])

    const errors = ref([])
    const router = useRouter()

    const getProducts = async () => {
        let response = await http.get('/api/v1/products')
        products.value = response.data.data
    }

    const getProduct = async (id) => {
        try {
            let response = await http.get(`/api/v1/products/${id}`)
            product.value = response.data.data
        } catch (e) {
            errors.value.push(e.message);
        }
    }

    return {
        errors,
        router,
        product,
        products,
        getProducts,
        getProduct
    }
}
