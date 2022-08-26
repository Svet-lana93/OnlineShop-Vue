<template>
  <div class="container">
    <h2>Orders story</h2>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Delivery address</th>
        <th>Date</th>
        <th>Total price</th>
        <th>Product title</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="order in userOrders">
        <tr>
          <td>{{ order.id }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.delivery_address }}</td>
          <td>{{ order.created_at }}</td>
          <td>{{ order.order_product[0].price }}</td>
          <td>
            <template v-for="order_product in order.order_product">
                  <div>
                    {{ order_product.product.title }}
                  </div>
            </template>
          </td>
          <td>
            <template v-for="order_product in order.order_product">
              <div>
                {{ order_product.product_quantity }}
              </div>
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import useOrders from "../../composables/orders";
import { onMounted } from "vue";

export default {
  name: "OrdersStory",

  setup () {

    const { userOrders, getUserOrders, getAuthUser, user, token } = useOrders();

    const initData = async () => {
      await getAuthUser(token)
      await getUserOrders(user.value.id)
    }

    onMounted(initData)

    return {
      userOrders
    }
  }
}
</script>

<style scoped>

</style>
