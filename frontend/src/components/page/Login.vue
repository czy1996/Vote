<template>
  <v-container grid-list-md>
    <v-layout id="login" row justify-center>
      <login-card/>
    </v-layout>
    <v-layout id="register" row justify-center>
      <register-card/>
    </v-layout>
  </v-container>
</template>

<script>
  import LoginCard from '../common/LoginCard'
  import RegisterCard from '../common/RegisterCard'

  export default {
    components: {LoginCard, RegisterCard},
    name: 'login',
    data () {
      return {}
    },
  }
</script>

<style scoped>


</style>
