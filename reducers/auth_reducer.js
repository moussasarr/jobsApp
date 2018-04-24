import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from '../actions/types';

export default function(state = {}, action) {
  const { type, payload } = action ;

  switch (type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: payload }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null }

    default:
      return state;
  }
}
