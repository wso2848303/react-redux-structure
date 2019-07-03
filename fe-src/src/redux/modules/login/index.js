export const types = {
  LOGIN_SET_TEXT: 'LOGIN_SET_TEXT'
}
const initialState = {
  userName: '',
  password: '',
  loading: false,
  text: 'login test'
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_SET_TEXT: {
      return Object.assign({}, state, { text: action.text });
    }
    default: return state;
  }
}
export default reducer;
export const actions = {
  setText: (text) => ({
    type: types.LOGIN_SET_TEXT,
    text: text
  })
}