<template>
  <v-container>
    <div id="key"
    >{{ publicKey }}
    </div>

    <div id="n"
    >{{ modulus }}
    </div>

    <div id="e"
    >{{ exponent }}
    </div>

    <div id="b64sig"
    >{{ b64sig }}

    </div><div id="decrypted"
    >{{ decrypted }} 解密
    </div>
  </v-container>

</template>

<script>
  import rsa from '../../utils/rsa'

  export default {
    name: 'encrypt',
    data () {
      return {
        publicKey: rsa.key,
        modulus: rsa.n,
        exponent: rsa.e,
        b64sig: rsa.b64sig,
        decrypted: rsa.decrypted,
      }
    },
  }
</script>

<style scoped>

</style>
