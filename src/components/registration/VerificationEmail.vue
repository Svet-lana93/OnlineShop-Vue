<template>

</template>

<script>

import useRegistration from "../../composables/registration";

export default {
  name: "VerificationEmail",
  props: {
    token: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    const { verifyUser } = useRegistration()

    verifyUser(props.token);

    return {
      verifyUser
    }
  }
}
</script>

<style scoped>

</style>
