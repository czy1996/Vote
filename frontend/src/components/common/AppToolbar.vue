<template>
  <v-toolbar
    app
    :clipped-left="clipped"
    color="primary white--text"
    dark
  >
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-if="isLogin">
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-show="true" @click="logout" avatar>
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>登出</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
  import auth from '../../api/auth'
  // import axios from '../../api/http'

  export default {
    name: 'app-toolbar',
    props: ['drawer', 'title', 'clipped'],
    data () {
      return {}
    },
    computed: {
      isLogin () {
        return this.$store.state.isLogin
      },
    },
    methods: {
      toggleDrawer () {
        this.$emit('update:drawer', !this.drawer)
      },
      logout () {
        auth.logout()
        // axios.get('/api/auth/logout')
      },
    },
  }
</script>

<style scoped>

</style>
