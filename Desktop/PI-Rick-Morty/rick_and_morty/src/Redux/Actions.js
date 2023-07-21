import { ADDFAV, REMOVEFAV } from './Action_Type'

export const addfav = (character) => {
  return {
    type: ADDFAV,
    payload: character
  }
}

export const removefav = (id) => {
  return {
    type: REMOVEFAV,
    payload: id
  }
}
