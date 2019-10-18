import React from "react"
import "./App.css"
import { connect } from "react-redux"
import { fetchDogs, clearDogs, changeBreed } from "./actions/dogs"
import debounce from "lodash.debounce"

const useForceUpdate = () => React.useState()[1]

const App = props => {
  const forceUpdate = useForceUpdate()
  const [breeds, setBreeds] = React.useState([])

  React.useEffect(() => {
    props.fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        props.fetchData()
      }
    }, 100)
    return () => {
      delete window.onscroll
    }
  }, [props])

  React.useEffect(() => {
    if (props.dogs.length === 0) {
      forceUpdate()
    }
  }, [forceUpdate, props.dogs])

  const getBreeds = async () => {
    await fetch("https://dog.ceo/api/breeds/list/all")
      .then(r => r.json())
      .then(r => {
        let _breeds = {}
        Array.from(Object.keys(r.message)).forEach(breed => {
          _breeds[breed] = breed
        })
        setBreeds(_breeds)
      })
  }

  React.useEffect(() => {
    getBreeds()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      {/* NOTE: Upon increased complexity, move into it's own component for maintaining simplicity in this file*/}
        <select
          defaultValue={props.dogs.breed}
          onChange={e => {
            props.changeBreed(e.currentTarget.value)
            props.clear()
            props.fetchData()
          }}
          className="minimal"
        >
        {/* NOTE: Upon increased complexity, move into it's own component for maintaining simplicity in this file*/}
          {Array.from(Object.keys(breeds)).map(breed => {
            return breed === props.dogs.breed ? (
              <option value={breed} key={breed} selected>
                {breeds[breed]}
              </option>
            ) : (
              <option value={breed} key={breed}>
                {breeds[breed]}
              </option>
            )
          })}
        </select>
      </header>
      <div className="dog-container">
        {Array.from(props.dogs.dogs).map(dog => {
          return (
            <img
              src={dog}
              key={dog}
              alt={dog.split("/")[dog.split("/").length - 2]}
            />
          )
        })}
      </div>
      {props.dogs.size === 0 && <h4>Scroll for Some Doggies</h4>}
      {props.isLoading && <span>Gathering Doggies</span>}
      {props.hasErrored && <span>No More Doggies <span role="img" aria-label="sad-face">😢</span></span>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    dogs: state.dogs,
    hasErrored: state.couldNotFetchDogs,
    isLoading: state.dogsAreLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchDogs()),
    clear: () => dispatch(clearDogs()),
    changeBreed: breed => dispatch(changeBreed(breed))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
