import { ADDFAV, REMOVEFAV } from './Action_Type'

const initialState = {
  myFavorites: [],
  allCharacters: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDFAV:
      return {
        myFavorites: action.payload,
        allCharacters: action.payload
      }

    case REMOVEFAV:
      return {
        myFavorites: action.payload,
        allCharacters: action.payload
      }

    default:
      return { ...state }
  }
}

export default rootReducer
