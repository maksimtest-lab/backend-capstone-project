import { SET_USER } from '../actions/actionTypes';

const initialState = { name: 'Guest' };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}