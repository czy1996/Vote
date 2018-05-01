from Crypto.Random import random
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes, bytes_to_long
from uuid import uuid4
import json
import base64
from binascii import hexlify

import os


def get_private_key():
    current_path = os.path.split(os.path.realpath(__file__))[0]
    key_path = os.path.join(current_path, 'private.key')
    with open(key_path) as f:
        content = f.read()
        # print(content)
        return RSA.importKey(content)


def decode_base64(data):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    missing_padding = len(data) % 4
    if missing_padding != 0:
        data += b'=' * (4 - missing_padding)
    return base64.decodebytes(data)


def sign(message):
    key = get_private_key()

    # print('private key', key)

    # print('blind message', hexlify(message))

    sig = key.sign(message, 0)

    # print('sig', sig[0])

    sig_in_bytes = long_to_bytes(sig[0])

    # print('sig in bytes', hexlify(sig_in_bytes))

    sig_in_b64 = base64.encodebytes(sig_in_bytes)

    return sig_in_b64.decode()


def unblind(b64sig, blind_factor):
    key = get_private_key()

    sig_in_bytes = base64.decodebytes(b64sig.encode())

    sig_in_long = bytes_to_long(sig_in_bytes)

    return key.unblind(sig_in_long, blind_factor)


def verify(message, unblinded_signature):
    key = get_private_key()
    return key.verify(message, unblinded_signature)


if __name__ == '__main__':

    message = {
        'vote_id': 1,
        'option_id': 2,
        'uuid4': uuid4().hex
    }
    message = json.dumps(message)
    message = message.encode()
    message = b'Hello'

    key = get_private_key()

    blind_factor = random.randrange(key.n >> 10, key.n)
    blind_factor = 90
    blinded_message = key.blind(message, blind_factor)
    # print('blind message', hexlify(blinded_message))
    signature = sign(blinded_message)
    # print('b64sig', signature)
    unblind_signature = unblind(signature, blind_factor)
    # print('unblind sig', hexlify(long_to_bytes(unblind_signature)))

    if key.verify(message, (unblind_signature,)):
        print("OK")
    else:
        print("Incorrect signature")
