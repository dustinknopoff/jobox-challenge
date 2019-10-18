import { combineReducers } from "redux"
import { couldNotFetchDogs, dogs, dogsAreLoading } from "./dogs"
export default combineReducers({
  couldNotFetchDogs,
  dogs,
  dogsAreLoading,
})
