// ajouter le token qui existe dans le localStorage
const tokenLs = localStorage.getItem("token");
const initialState = { token: tokenLs ? tokenLs : null };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
