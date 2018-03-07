from flask import (Blueprint,
                   request,
                   )

from utils import (json_response, log)
from utils.blind import sign, unblind, decode_base64

main = Blueprint('rsa', __name__)


@main.route('/sign', methods=['POST'])
def _sign():
    message = request.json.get('message', None)
    if message is not None:
        message = decode_base64(message.encode())
        # log('blind message', hexlify(message))
        signature = sign(message)
        # log('b64sig', signature)
        unblinded = unblind(signature, 90)
        # log(hexlify(long_to_bytes(unblinded)))
        return json_response({
            'signature': signature,
        })
    else:
        return json_response({
            'error': 'no message provided'
        })
