<template>
  <div class="container">
    <h2>Create order</h2>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <form v-on:submit.prevent="saveOrder">
      <div class="mb-3">
        <b>Product title:</b><br>
        {{ product.title }}
      </div>
      <div class="mb-3">
        <b>Product description:</b><br>
        {{ product.description }}
      </div>
      <div class="mb-3">
        <b>Product price:</b><br>
        {{ product.price }}
      </div>
      <div class="mb-3">
        <label for="productQuantity" class="form-label"><b>Product quantity:</b></label>
        <input id="productQuantity" type="number" class="form-control" name="product_quantity" v-model="form.product_quantity">
      </div>
      <div class="mb-3">
        <label for="deliveryAddress" class="form-label"><b>Delivery address:</b></label>
        <input id="deliveryAddress" type="text" class="form-control" name="delivery_address" v-model="form.delivery_address">
      </div>
      <div class="mb-3">
        <b>Total price:</b> {{ form.product_quantity*product.price }}
      </div>
      <input type="submit" class="btn btn-success" value="Create">
    </form>
  </div>
</template>

<script>
import useProducts from "../../composables/products";
import {onMounted, ref} from "vue";
import {reactive} from "vue";
import useOrders from "../../composables/orders";

export default {
  name: "OrdersCreate",
  props: {
    id: {
      type: String,
      required: true,
    }
  },

  setup (props) {

    const { getProduct, product } = useProducts();
    const { errors, createOrder, getAuthUser, user, token} = useOrders();

    const form = reactive({
      product_id: props.id,
      product_quantity: "",
      delivery_address: "",
      user_id: null
    })

    const initData = async () => {
      await getProduct(props.id)
      await getAuthUser(token)
      form.user_id = user.value.id
    }

    onMounted(initData)

    const saveOrder = async () => {
      await createOrder(form);
    }

    return {
      errors,
      product,
      form,
      saveOrder,
      user
    }
  }
}
</script>

<style scoped>

</style>
