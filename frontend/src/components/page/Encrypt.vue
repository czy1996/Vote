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

    </div>

    <div id="decrypted"
    >{{ blindDecrypted }} 盲化
    </div>

    <div id="unblinddecrypted"
    >{{ unblindDecrypted }} 未盲化
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
        blindDecrypted: rsa.blindDecrypted,
        unblindDecrypted: rsa.unblindDecrypted,
      }
    },
  }
</script>

<style scoped>

</style>
