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
            v-if="item.show"
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
        title: '投票系统',
      }
    },
    name: 'App',
    computed: {
      pages () {
        return [
          {
            icon: 'bubble_chart',
            title: '首页',
            path: '/',
            show: true,
          },
          {
            icon: 'exit_to_app',
            title: '登录',
            path: '/login',
            show: !this.$store.state.isLogin,
          },
          {
            icon: 'view_agenda',
            title: '公开的投票',
            path: '/publicVotes',
            show: true,
          },
          {
            icon: 'view_agenda',
            title: 'Encrypt',
            path: '/encrypt',
            show: true,
          },
          {
            icon: 'view_agenda',
            title: '提交匿名选票',
            path: '/encryptVote',
            show: true,
          },
          {
            icon: 'view_agenda',
            title: '创建投票',
            path: '/createVote',
            show: this.$store.state.isLogin,
          },
        ]
      },
    },
  }
</script>
