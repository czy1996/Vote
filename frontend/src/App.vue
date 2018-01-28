<template>
  <div id="app">
    <md-app md-waterfall>

      <md-app-toolbar class="md-primary">
        <span class="md-title">投票系统</span>
      </md-app-toolbar>

      <md-app-drawer md-permanet="full">

      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import url('https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css');
  @import "../node_modules/vue-material/dist/vue-material.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
