import { ADDFAV, REMOVEFAV } from './Action_Type'

const initialState = {
  myFavorites: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDFAV:
      return { ...state, myFavorites: [...state.myFavorites, action.payload] }
    case REMOVEFAV:
      return { ...state, myFavorites: state.myFavorites.filter((fav) => fav.id !== action.payload) }
    default:
      return { ...state }
  }
}

export default rootReducer
