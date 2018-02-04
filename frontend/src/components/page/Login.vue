<template>
  <v-container grid-list-md>
    <v-layout row justify-center>
      <v-flex md8 xs12>
        <v-subheader>登录</v-subheader>
        <v-card>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                label="用户名"
                v-model="username"
                :rules="nameRules"
                :counter="10"
                required
              ></v-text-field>
              <v-text-field
                label="密码"
                v-model="password"
                :rules="emailRules"
                :append-icon="passwordIcon"
                :append-icon-cb="switchPassWordIcon"
                :type="passwordType"
                required
              ></v-text-field>
              <v-btn
                @click="submit"
                :disabled="!valid"
              >
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex md8 xs12>
        <v-card>
          <v-card-text>
            <h1>Title</h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { val}
  export default {
    name: 'login',
    data () {
      return {
        valid: true,
        drawerType: '',
        passwordVisible: false,
        username: '',
        password: '',
      }
    },
    computed: {
      passwordIcon () {
        return this.passwordVisible ? 'visibility' : 'visibility_off'
      },
      passwordType () {
        return this.passwordVisible ? 'text' : 'password'
      },
    },

    methods: {
      switchPassWordIcon () {
        this.passwordVisible = !this.passwordVisible
      },

      clear () {
        this.username = ''
        this.password = ''
      },
    },
  }
</script>

<style scoped>

</style>
