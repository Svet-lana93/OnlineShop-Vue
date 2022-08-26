<template>
  <div class="container">
    <h2>Registration</h2>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <form v-on:submit.prevent="saveUser">
      <div class="mb-3">
        <label for="firstname" class="form-label">Firstname</label>
        <input type="text" class="form-control" name="firstname" v-model="form.firstname" placeholder="Firstname">
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Lastname</label>
        <input type="text" class="form-control" name="lastname" v-model="form.lastname" placeholder="Lastname">
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" name="username" v-model="form.username" placeholder="Username">
      </div>
      <div class="mb-3">
        <label for="mobile" class="form-label">Mobile</label>
        <input type="text" class="form-control" name="mobile" v-model="form.mobile" placeholder="Mobile">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" name="email" v-model="form.email" placeholder="Email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" v-model="form.password" placeholder="Password">
      </div>
      <div class="mb-3">
        <label for="passwordRepeat" class="form-label">Repeat your password</label>
        <input type="password" class="form-control" name="passwordRepeat" v-model="form.passwordRepeat" placeholder="Password">
      </div>
      <input type="submit" class="btn btn-success" value="registration">
    </form>
  </div>
</template>

<script>
import {reactive} from "vue";
import useRegistration from "../../composables/registration";

export default {
  name: "Registration",

  setup() {
    const form = reactive({
      firstname: "",
      lastname: "",
      username: "",
      mobile: "",
      password: "",
      passwordRepeat: "",
    })

    const { errors, registerUser } = useRegistration()

    const saveUser = async () => {
      await registerUser(form)
    }

    return {
      errors,
      form,
      saveUser
    }
  }
}
</script>

<style scoped>

</style>
