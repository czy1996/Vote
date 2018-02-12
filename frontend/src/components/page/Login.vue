<template>
  <v-container grid-list-md transition="slide-x-transition">
    <v-layout row justify-center>
      <v-flex md7 xs12>

        <v-alert
          :color="alertColor"
          :icon="alertIcon"
          :value="isAlert"
          transition="scale-transition"
        >{{alertMessage}}
        </v-alert>

        <v-subheader>登录</v-subheader>

        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                label="用户名"
                v-model="username"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                :error-messages="usernameErrors"
                :counter="10"
                required
              ></v-text-field>

              <v-text-field
                label="密码"
                v-model="password"
                :append-icon="passwordIcon"
                :append-icon-cb="switchPassWordIcon"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :type="passwordType"
                required
                @keyup.enter="submit"
                :error-messages="passwordErrors"
              ></v-text-field>

              <v-btn
                @click="submit"
                :disabled="$v.$invalid"
                flat
                color="primary"
              >
                submit
              </v-btn>

              <v-btn
                @click="clear"
                flat
              >clear
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex md7 xs12>
        <vote-card :id="1"></vote-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'
  import loin from '../../api/auth'
  import VoteCard from '../common/VoteCard'

  export default {
    components: {VoteCard},
    name: 'login',
    mixins: [validationMixin],
    validations: {
      username: {required},
      password: {required},
    },

    data () {
      return {
        drawerType: '',
        passwordVisible: false,
        username: '',
        password: '',
        isAlert: false,
        loginStatus: 'fail',
        op1Val: false,
      }
    },

    computed: {
      passwordIcon () {
        return this.passwordVisible ? 'visibility' : 'visibility_off'
      },

      passwordType () {
        return this.passwordVisible ? 'text' : 'password'
      },

      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Name is required.')
        return errors
      },

      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('password is required.')
        return errors
      },

      alertColor () {
        if (this.loginStatus === 'success') {
          return 'success'
        } else {
          return 'error'
        }
      },

      alertIcon () {
        if (this.loginStatus === 'success') {
          return 'check_circle'
        } else {
          return 'warning'
        }
      },

      alertMessage () {
        if (this.loginStatus === 'success') {
          return '登录成功'
        } else {
          return '登录失败, 请检查用户名密码'
        }
      },
    },

    methods: {
      switchPassWordIcon () {
        this.passwordVisible = !this.passwordVisible
      },

      clear () {
        this.username = ''
        this.password = ''
        this.isAlert = false
        this.$v.$reset()
      },

      submit () {
        this.$log('submit clicked')
        loin.login({
          username: this.username,
          password: this.password,
        }).then(data => {
          this.$log(data)
          this.loginStatus = data.status
          this.isAlert = true
          if (data.status === 'success') {
            this.$router.replace({
              name: 'index',
            })
          }
        })
      },
    },

  }
</script>

<style scoped>


  .option-bar {
    /*margin: ;*/
  }

</style>
