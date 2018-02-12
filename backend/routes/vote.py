from model.Vote import Vote

from flask import Blueprint, request

from utils import json_response, log


main = Blueprint('vote', __name__)


@main.route('/public/<int:vote_id>', methods=['GET'])
def get_public_vote(vote_id):
    v = Vote.get_by_id(vote_id)
    return v.to_json()


@main.route('/public/<int:vote_id>', methods=['PATCH'])
def patch_public_vote(vote_id):
    data = request.json
    vote = Vote.get_by_id(vote_id)
    log(data)
    for k, v in data.items():
        vote.inc_options(int(k), v)
    return vote.to_json()

