import {
  selectCountries,
  selectStates,
  selectCities,
} from '../../store/reducers/countrySlice'
import { fetchCities } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { FilterToggle } from './FilterToggle'
import styles from './displayFilters.module.css'
import Loader from '../page/Loader'

const City = ({ city }) => {
  const dispatch = useDispatch()
  const dispatchCallback = (type) => {
    dispatch({ type: type, payload: city })
  }
  return (
    <FilterToggle
      cb={dispatchCallback}
      label="City"
      dataKey="cities"
      dataValue={city}
    >
      <h5>{city}</h5>
    </FilterToggle>
  )
}

const Cities = ({ cities }) => {
  if (cities) {
    return cities.map((city, index) => <City city={city} key={city} />)
  }
  return <Loader />
}

const State = ({ country, state: StateName, dispatch }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const toggleFilters = () => setFiltersOpen(!filtersOpen)
  const dataToSend = {
    country,
    state: StateName,
  }

  const getCities = async () =>
    dispatch((dispatch, state) => fetchCities(dispatch, state, dataToSend))

  const handleClick = () => {
    getCities()
    toggleFilters()
  }

  const allCities = useSelector(selectCities)

  const citiesMap = allCities[StateName]

  const dispatchCallback = (type) => {
    dispatch({ type: type, payload: StateName })
  }

  if (!StateName) {
    return <Loader />
  }

  return (
    <>
      <FilterToggle
        cb={dispatchCallback}
        label="State"
        dataKey="states"
        dataValue={StateName}
      >
        <h4 onClick={() => handleClick()}>{StateName}</h4>
      </FilterToggle>
      <div className={styles.filtersContainer}>
        {filtersOpen && <Cities cities={citiesMap} />}
      </div>
    </>
  )
}

const Country = ({ country, statesSelector }) => {
  const dispatch = useDispatch()

  const [filtersOpen, setFiltersOpen] = useState(false)

  const statesData = statesSelector(country)

  const toggleFilters = () => setFiltersOpen(!filtersOpen)

  const dispatchCallback = (type) => {
    dispatch({ type: type, payload: country })
  }

  const StatesMap = statesData.map((state) => (
    <State
      key={state.name}
      country={country}
      state={state.name}
      dispatch={dispatch}
    />
  ))

  if (!country) {
    return <Loader />
  }

  return (
    <>
      <FilterToggle
        cb={dispatchCallback}
        label="Country"
        dataKey="countries"
        dataValue={country}
      >
        <h3 onClick={toggleFilters}>{country}</h3>
      </FilterToggle>
      <div className={styles.filtersContainer}>{filtersOpen && StatesMap}</div>
    </>
  )
}

export const CountryFilters = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const countries = useSelector(selectCountries)
  const allStates = useSelector(selectStates)

  const toggleFilters = () => setFiltersOpen(!filtersOpen)

  const statesSelector = (country) =>
    allStates.filter((e) => e.country === country)[0].states

  const Countries = countries.map((country, index) => (
    <Country country={country} key={index} statesSelector={statesSelector} />
  ))

  return (
    <div>
      <div onClick={toggleFilters}>
        <h2>Страны и штаты</h2>
      </div>
      <div className={styles.filtersContainer}>{filtersOpen && Countries}</div>
    </div>
  )
}
