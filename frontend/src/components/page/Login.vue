<template>
  <v-container grid-list-md>
    <v-layout id="login" row justify-center>
      <login-card/>
    </v-layout>
  </v-container>
</template>

<script>
  import LoginCard from '../common/LoginCard'

  export default {
    components: {LoginCard},
    name: 'login',
    data () {
      return {}
    },
  }
</script>

<style scoped>


</style>
