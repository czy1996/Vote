<template>
  <v-container>

    <v-layout
      row
      justify-center
    >
      <v-flex xs12 md7>
        <v-card>
          <v-card-text>
            <v-text-field
              label="公钥"
              textarea
              disabled
              v-model="publicKey"
            >
            </v-text-field>

            <v-text-field
              label="签名"
              textarea
              disabled
              v-model="b64sig"
            >
            </v-text-field>

            <div>
              签名验证: {{isSigValid}}
            </div>

            <v-text-field
              label="message"
              v-model="message"
            >

            </v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn flat @click="sign">签名</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>


  </v-container>

</template>

<script>
  import RSAUtils from '../../utils/rsa'
  import rsaApi from '../../api/rsa'

  const rsa = new RSAUtils()

  export default {
    name: 'encrypt',
    data () {
      return {
        publicKey: rsa.key,
        message: '',
        b64sig: null,
        isSigValid: null,
      }
    },
    methods: {
      sign () {
        // this.$log('e bitlength', rsa.e.bitLength())
        let blindMessage = rsa.blind(this.message)
        this.$log('blindMessage', blindMessage)
        rsaApi.sign(blindMessage).then(data => {
          this.$log(data)
          this.b64sig = data.signature
          this.isSigValid = rsa.verify(this.message, data.signature)
        })
      },
    },
  }
</script>

<style scoped>

</style>
