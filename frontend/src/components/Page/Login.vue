<template>
  <div class="wrapper">
    <form class="md-layout md-alignment-top-center" @submit.prevent="onSubmit">
      <md-card class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-66">
        <md-card-header>
          <div class="md-title">登录</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label>用户名</label>
            <md-input v-model="username"></md-input>
          </md-field>

          <md-field>
            <label>密码</label>
            <md-input v-model="password"></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">登录</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit (event) {
      this.log('log from $log')
      this.axios.post('/api/login', {
        username: 'shit',
        password: 'fuck',
      })
    },
  },
}
</script>

<style scoped>
  .no-display {
    display: none;
  }
</style>
