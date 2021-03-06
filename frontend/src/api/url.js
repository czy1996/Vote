export const AUTH = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  CHECK_NAME: '/auth/checkUsername',
}

export const VOTE = {
  GET_PUBLIC: '/vote/public/',
  PATCH_PUBLIC: '/vote/public/',

  GET_PUBLIC_ALL: '/vote/public/all',

  POST_PRIVATE: '/vote/private/',
  GET_PRIVATE_ALL: '/vote/private/all',
  GET_PRIVATE: '/vote/private/',

  POST_PRIVATE_TICKET: '/vote/private/ticket',
}

export const RSA = {
  SIGN: '/rsa/sign',
}

export const USER = {
  GET_USER_ALL: '/user/all',
}
