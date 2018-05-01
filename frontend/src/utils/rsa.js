/*
前端只需要公钥

公钥只需要

n, modules
e, public exponent

step 1: parse n, e from pem

step 2: unblind

step 3: textbook rsa decryption

*/
import JSEncrypt from 'JSEncrypt'

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4aPNFXB0vCRqBiV06nGA\n' +
  'YxjctHt4Ezb4BoRLk3hpmmdwpPLavMv0mH0LvyIb7n9s71FaE0u4ZdGmmpJGe0fR\n' +
  '+yey4NR1YLcTvVkQPnMUMuqq/V2rHCIsdidr6RW/TO8XavHyov5ZUhjqzqOsFu3W\n' +
  'LTsglcuGCHv4jQBivMCuhGE2HQi+Ny4YJKPz28U42RemMt6qdsp6X/mp+w5M7+jA\n' +
  'tCpsHORWyOMkF8N7AWkgSkwXTTcurU0EiaDWt2QbgVkYtFkKdFKrtK3yDvS9zATh\n' +
  'Oiqtr1AH4y4QH1FT+oJorpc+v16V0y6uWOqfwHiO964upzNUhb8LQ0Sc+JqxIqbt\n' +
  'JQIDAQAB\n' +
  '-----END PUBLIC KEY-----\n'

// const blinded = 'hRLEmdDwW0Q/CDkKe1ep79cXiq4ygVRzjPQcpf9DCujWn91830wPCwi02Ki1c5cFI7vZCY+F7CkX' +
//   'hz8I8w5hVi3EYM781xlV0OLUCMwAV4D/96M1UuJdptRnqayEpKH2gQRPY+cmm8eL4ceBsrhveyzk' +
//   'G0ZWA0z5m1zenIG1pyk='
// //
// const unblind = 'vSHqKe9M9URC5ECLYNx4eYIjHZF44hIP1/+cQdyRNjhKCpkqjdcqGYMfIzQipAPoGD/gOv+BPUfa' +
//   'WDXKlv0WMUtj+b6lbuneT1MlaNCz3daDxTt/9iKBEDK/FwHTSkKVL/86kl+phe27Qi2bjWL6uclh' +
//   '30yFnV2SYt30PSCpUIg='

class RSAUtils {
  constructor () {
    this.key = publicKey
    this.encrypt = new JSEncrypt()
    this.encrypt.setPublicKey(this.key)
    this.n = this.encrypt.getKey().n.intValue()
    this.e = this.encrypt.getKey().e
  }

  blind (message) {
    let b64str = this.encrypt.blind(message)
    return b64str
  }

  verify (message, b64sig) {
    return this.encrypt.verify(message, b64sig)
  }

  unblind (b64sig) {
    return this.encrypt.unblindB64Sig(b64sig)
  }
}

export default RSAUtils
