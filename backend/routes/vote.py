from model.Vote import PublicVote, BlindVote, Option

from flask import Blueprint, request

from utils import json_response, log
from utils.blind import decode_base64, verify

import json

main = Blueprint('vote', __name__)


@main.route('/public/<int:vote_id>', methods=['GET'])
def get_public_vote(vote_id):
    v = PublicVote.get_by_id(vote_id)
    return v.to_json()


@main.route('/public/<int:vote_id>', methods=['PATCH'])
def patch_public_vote(vote_id):
    data = request.json
    vote = PublicVote.get_by_id(vote_id)
    log(data)
    for k, v in data.items():
        vote.inc_options(int(k), v)
    return vote.to_json()


@main.route('/public/all', methods=['GET'])
def get_public_vote_all():
    votes = PublicVote.objects
    result = []
    for vote in votes:
        result.append(vote.Id)
    return json_response(result)


@main.route('/private/', methods=['POST'])
def post_private_vote():
    data = request.json
    log('vote private post', data)
    v = BlindVote()
    v.title = data['title']
    for option in data['options']:
        o = Option(title=option['title'])
        v.options.append(o)
    v.save()
    v.reload()
    return v.to_json()


@main.route('/private/all', methods=['GET'])
def get_private_all():
    votes = BlindVote.objects
    result = []
    for vote in votes:
        result.append(vote.Id)
    return json_response(result)


@main.route('/private/<int:vote_id>', methods=['GET'])
def get_private_vote(vote_id):
    v = BlindVote.get_by_id(vote_id)
    return v.to_json()


@main.route('/private/ticket', methods=['POST'])
def post_private_ticket():
    data = request.json
    message = data['message']
    signature = data['signature']
    log('message', message.encode())
    signature = decode_base64(signature.encode('utf-8'))
    log('signature', signature)

    is_valid = verify(message.encode(), signature)

    if is_valid is True:
        m = json.loads(message)
        vote_id = m['voteId']
        vote = BlindVote.get_by_id(vote_id)
        for k, v in m['options'].items():
            vote.inc_options(int(k), v)
        res = {
            'status': 'success',
        }
    else:
        res = {
            'status': 'fail',
            'err_message': '选票无效'
        }

    return json_response(res)
