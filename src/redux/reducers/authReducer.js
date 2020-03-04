import { LOGIN, LOGOUT, SET_LOADING } from "../actions/authActions";

const initialState = {
  user: null,
  authenticated: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loading: false,
        user: action.payload.user,
        authenticated: true
      };
    case LOGOUT:
      return {
        loading: false,
        user: null,
        authenticated: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
