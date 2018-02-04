<template>
  <v-container grid-list-md>
    <v-layout row justify-center>
      <v-flex md8 xs12>
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
              >clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex md8 xs12>
        <v-card>
          <v-card-text>
            <h1>{{ $v.username.$dirty}}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'

  export default {
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
    },

    methods: {
      switchPassWordIcon () {
        this.passwordVisible = !this.passwordVisible
      },

      clear () {
        this.username = ''
        this.password = ''
        this.$v.$reset()
      },

      submit () {
      },
    },

    mounted () {
      console.log(this.$v.$invalid)
    },
  }
</script>

<style scoped>

</style>
