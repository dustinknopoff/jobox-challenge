export function couldNotFetchDogs(bool) {
  return {
    type: "NO_DOGS",
    hasErrored: bool,
  }
}

export function dogsAreLoading(bool) {
  return {
    type: "FETCHING_DOGS",
    isLoading: bool,
  }
}

export function dogsWereLoaded(dogs) {
  return {
    type: "FETCH_DOGS_SUCCESS",
    dogs,
  }
}

export function clearDogs() {
  return {
    type: "CLEAR_DOGS",
    dogs: new Set(),
  }
}

export function fetchDogs() {
  return (dispatch, getState) => {
    const {dogs} = getState()
    fetch(`https://dog.ceo/api/breed/${dogs.breed}/images/random/10`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(dogsAreLoading(false))
        return response
      })
      .then(response => response.json())
      .then(items => {
        dispatch(dogsWereLoaded(items["message"]))
      })
      .catch(() => dispatch(couldNotFetchDogs(true)))
    }
  }

export function changeBreed(breed) {
  return {
    type: "CHANGE_BREED",
    breed
  }
}
