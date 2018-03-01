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

const b64sig = 'vSHqKe9M9URC5ECLYNx4eYIjHZF44hIP1/+cQdyRNjhKCpkqjdcqGYMfIzQipAPoGD/gOv+BPUfa' +
  'WDXKlv0WMUtj+b6lbuneT1MlaNCz3daDxTt/9iKBEDK/FwHTSkKVL/86kl+phe27Qi2bjWL6uclh' +
  '30yFnV2SYt30PSCpUIg='

class RSA {
  constructor () {
    this.key = publicKey
    this.encrypt = new JSEncrypt()
    this.encrypt.setPublicKey(this.key)
    this.n = this.encrypt.getKey().n.intValue()
    this.e = this.encrypt.getKey().e
    this.b64sig = b64sig
    this.decrypted = this.encrypt.verify('Hello', this.b64sig)
  }
}

export default new RSA()
