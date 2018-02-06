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
  </v-toolbar>
</template>

<script>
  export default {
    name: 'app-toolbar',
    props: ['drawer', 'title', 'clipped'],
    data () {
      return {}
    },
    methods: {
      toggleDrawer () {
        this.$emit('update:drawer', !this.drawer)
      },
    },
  }
</script>

<style scoped>

</style>
