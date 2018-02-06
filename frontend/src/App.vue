<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <div v-for="(item, i) in pages" :key="i">
          <v-list-tile
            :to="item.path"
            exact
            ripple
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <app-toolbar
      :title="title"
      :drawer.sync="drawer"
      :clipped="clipped"
    ></app-toolbar>
    <v-content>
      <main>
        <transition name="slide-x-transition" mode="out-in">
          <router-view/>
        </transition>
      </main>
    </v-content>
    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import AppToolbar from './components/common/AppToolbar'

  export default {
    components: {AppToolbar},
    data () {
      return {
        clipped: false,
        drawer: null,
        pages: [
          {
            icon: 'bubble_chart',
            title: '首页',
            path: '/',
          },
          {
            icon: 'exit_to_app',
            title: '登录',
            path: '/login',
          }],
        title: '投票系统',
      }
    },
    name: 'App',
  }
</script>
