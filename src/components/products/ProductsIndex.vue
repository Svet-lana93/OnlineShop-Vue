<template>
  <div class="container">
    <h2>Products</h2>
    <hr>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="product in products">
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <router-link :to="{ name: 'products.details', params: { id: product.id} }">View</router-link>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import useProducts from '../../composables/products'
import {onMounted} from 'vue'

export default {
  name: "ProductsIndex",

  setup() {
    const { errors, products, getProducts } = useProducts()

    onMounted(getProducts)

    return {
      errors,
      products,
    }
  }
}
</script>

<style scoped>

</style>
