from Crypto.Hash import SHA256
from Crypto.Signature import PKCS1_v1_5
from Crypto.PublicKey import RSA
from binascii import hexlify, unhexlify

from utils import log


def load_key(filename):
    with open(filename, 'r') as f:
        return RSA.importKey(f.read())


def digest_from_message(message):
    digest = SHA256.new()
    digest.update(message.encode(encoding='utf-8'))

    return digest


def sign(message):
    digest = digest_from_message(message)
    private_key = load_key('private.key')

    signer = PKCS1_v1_5.new(private_key)
    signed_digest = signer.sign(digest)

    return hexlify(signed_digest)


def verify(hexstr, message):
    """

    :param hexstr: hexadecimal string hexstr
    :return: bool
    """
    data = unhexlify(hexstr)
    public_key = load_key('public.key')
    digest = digest_from_message(message)

    verifier = PKCS1_v1_5.new(public_key)

    return verifier.verify(digest, data)


def main():
    message = 'message to be signed'

    signed = sign(message)

    assert verify(signed.decode(), message)


if __name__ == '__main__':
    main()
