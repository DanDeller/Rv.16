import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initAuth = {
  isAuthenticated: false,
  tokenId: null,
  userId: null
};

const setIsAuthenticated = (state, action) => {
  return updateObject(state, {isAuthenticated: action.toggle});
};

const setTokenId = (state, action) => {
  return updateObject(state, {tokenId: action.token});
};

const setUserId = (state, action) => {
  return updateObject(state, {userId: action.id});
};

const fiveDayForecast = (state = initAuth, action) => {
  switch (action.type) {
    case actionTypes.IS_AUTHENTICATED: return setIsAuthenticated(state, action)
    case actionTypes.SET_TOKEN_ID: return setTokenId(state, action)
    case actionTypes.SET_USER_ID: return setUserId(state, action)
    default: return state
  }
};

export default fiveDayForecast;