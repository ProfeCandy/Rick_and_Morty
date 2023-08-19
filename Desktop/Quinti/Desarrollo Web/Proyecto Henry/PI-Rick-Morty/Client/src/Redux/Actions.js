import { ADDFAV, REMOVEFAV } from './Action_Type'
import axios from 'axios'

export const addFav = (character) => async (dispatch) => {
  try {
    const endpoint = 'http://localhost:3001/rickandmorty/favs'
    const response = await axios.post(endpoint, character)
    const data = response.data

    return dispatch({
      type: ADDFAV,
      payload: data
    })
  } catch (error) {
    console.error('Error in addFav: ', error)
  }
}

export const removeFav = (id) => async (dispatch) => {
  try {
    const endpoint = 'http://localhost:3001/rickandmorty/favs/' + id
    const response = await axios.delete(endpoint)
    const data = response.data

    return dispatch({
      type: REMOVEFAV,
      payload: data
    })
  } catch (error) {
    console.error('Error in removeFav: ', error)
  }
}
