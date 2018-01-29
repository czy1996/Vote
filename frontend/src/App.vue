<template>
  <div id="app">
    <div class="wrapper  text-center">
      <md-app :class="appWrapper" class="app-wrapper">

        <md-app-toolbar class="md-primary">
          <md-button class="md-icon-button md-large-hide md-xlarge-hide" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">投票系统</span>
        </md-app-toolbar>

        <md-app-drawer md-persistent="full" :md-active.sync="menuVisible" class="drawer-wrapper">
          <md-toolbar class="md-transparent" md-elevation="0">
            Navigation
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item v-if="!isLogin">
              <md-icon>input</md-icon>
              <span class="md-list-item-text">登录</span>
            </md-list-item>

            <md-list-item>
              <md-icon>list</md-icon>
              <span class="md-list-item-text">公开的投票</span>
            </md-list-item>

            <md-list-item>
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Trash</span>
            </md-list-item>

            <md-list-item>
              <md-icon>error</md-icon>
              <span class="md-list-item-text">Spam</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import * as types from './assets/store/types'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data: function () {
    return {
      appWrapper: 'app-wrapper',
      menuVisible: false,
    }
  },

  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },

  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
  },
}
</script>

<style>
  @import url('https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css');
  @import "../node_modules/vue-material/dist/vue-material.css";
  @import "../static/css/main.css";

  .md-app {
    min-height: 100vh;
  }

  .drawer-wrapper {
    width: 280px;
  }
</style>
