export function couldNotFetchDogs(state = false, action) {
  switch (action.type) {
    case "NO_DOGS":
      return action.hasErrored
    default:
      return state
  }
}

export function dogsAreLoading(state = false, action) {
  switch (action.type) {
    case "FETCHING_DOGS":
      return action.isLoading
    default:
      return state
  }
}

const initialState = {
  dogs: new Set(),
  breed: "pug"
}

export function dogs(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DOGS_SUCCESS":
      let dogs = state.dogs
      action.dogs.forEach(dog => dogs.add(dog))
      return {
        ...state,
        dogs
      }
    case "CLEAR_DOGS":
      return {
        ...state,
        dogs: new Set()
      }
    case "CHANGE_BREED":
      return {
        ...state,
        breed: action.breed
      }
    default:
      return state
  }
}
