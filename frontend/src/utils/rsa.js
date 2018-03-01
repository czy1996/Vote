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
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDt3wIAgu5kfTqqO2E0iZ2IOV6o\n' +
  '76NWb9jEGOm5tkAkIARMFZHt8tPNQSFRPBruurZbiAOLjZOECy2uz+sLS22wpwiV\n' +
  'Wur88gL1cQTFpFPFCn9fFqUPLCew1MV/u2B/3r0+oTcZfTeyZDq5RWzRJ/CIas9i\n' +
  'yJKGh45h5ZA1pcWkoQIDAQAB\n' +
  '-----END PUBLIC KEY-----\n'

// const blinded = 'hRLEmdDwW0Q/CDkKe1ep79cXiq4ygVRzjPQcpf9DCujWn91830wPCwi02Ki1c5cFI7vZCY+F7CkX' +
//   'hz8I8w5hVi3EYM781xlV0OLUCMwAV4D/96M1UuJdptRnqayEpKH2gQRPY+cmm8eL4ceBsrhveyzk' +
//   'G0ZWA0z5m1zenIG1pyk='
//
// const unblind = 'vSHqKe9M9URC5ECLYNx4eYIjHZF44hIP1/+cQdyRNjhKCpkqjdcqGYMfIzQipAPoGD/gOv+BPUfa' +
//   'WDXKlv0WMUtj+b6lbuneT1MlaNCz3daDxTt/9iKBEDK/FwHTSkKVL/86kl+phe27Qi2bjWL6uclh' +
//   '30yFnV2SYt30PSCpUIg='

class RSA {
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
}

export default new RSA()
