<template>
  <div class="container">
    <h2>Product details</h2>
  </div>

  <table class="table table-striped">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Title:</b> {{ product.title }}</li>
      <li class="list-group-item"><b>Description:</b> {{ product.description }}</li>
      <li class="list-group-item"><b>Price:</b> {{ product.price }}</li>
    </ul>
  </table>

  <div class="content-actions" v-if="tokenExists()">
    <router-link :to="{ name: 'create' }">Buy a product</router-link>
  </div>
  <div class="content-actions" v-if="!tokenExists()">
    <router-link :to="{ name: 'login' }">You should be authorized to buy a product</router-link>
  </div>
</template>

<script>
import useProducts from "../../composables/products";
import {onMounted} from "vue";
import useLogin from "../../composables/auth";

export default {
  name: "ProductsDetails",
  props: {
    id: {
      type: String,
      required: true,
    }
  },

  setup (props) {
    const { errors, product, getProduct } = useProducts();

    const { isLogin } = useLogin();

    const tokenExists = () => {
      return isLogin();
    }

    onMounted(getProduct(props.id))

    return {
      errors,
      product,
      getProduct,
      tokenExists
    }
  }
}
</script>

<style scoped>

</style>
