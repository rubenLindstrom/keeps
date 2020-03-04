import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  SET_NOTES,
  SET_LOADING
} from "../actions/noteActions";

const initialState = {
  notes: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        loading: false,
        notes: { [action.payload.id]: action.payload.note, ...state.notes }
      };
    case SET_NOTES:
      return {
        loading: false,
        notes: action.payload.notes
      };
    case REMOVE_NOTE:
      return {
        loading: false,
        notes: Object.keys(state.notes).reduce((key, curr) => {
          if (curr.id !== action.payload.id)
            curr[key] = { ...state.notes[key] };
        }, {})
      };
    case UPDATE_NOTE:
      return {
        loading: false,
        notes: {
          ...state.notes,
          [action.payload.id]: action.payload.note
        }
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
