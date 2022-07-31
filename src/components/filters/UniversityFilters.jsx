import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectUniversityCountries,
  selectUniversities,
} from '../../store/reducers/universitySlice'
import { FilterToggle } from './FilterToggle'
import { useDispatch } from 'react-redux'
import styles from './displayFilters.module.css'
import Loader from '../page/Loader'

const University = ({ countryId }) => {
  const universities = useSelector(selectUniversities)
  const getUniInCity = (state, selector) => state[selector]
  const getUniversities = (selector) => getUniInCity(universities, selector)
  const dispatch = useDispatch()
  const Universities = getUniversities(countryId).map((university, index) => {
    const dispatchCallback = (type) => {
      dispatch({ type: type, payload: university })
    }

    if (!university) {
      return <Loader />
    }

    return (
      <FilterToggle
        cb={dispatchCallback}
        label="University"
        dataKey="universities"
        dataValue={university}
        key={index}
      >
        <div>{university}</div>
      </FilterToggle>
    )
  })
  return <div>{Universities}</div>
}

const Country = ({ country }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const toggleFilters = (e) => {
    e.stopPropagation()
    setFiltersOpen(!filtersOpen)
  }
  const universities = useSelector(selectUniversities)
  const getUniInCity = (state, selector) => state[selector]
  const getUniversities = (selector) => getUniInCity(universities, selector)
  const dispatch = useDispatch()

  const dispatchCallback = (type) => {
    const Universities = getUniversities(country)
    dispatch({ type: type, payload: Universities })
  }

  if (!country) {
    return <Loader />
  }

  return (
    <>
      <FilterToggle cb={dispatchCallback} label="University" parent>
        <h4 onClick={toggleFilters}>{country}</h4>
      </FilterToggle>
      <div className={styles.filtersContainer}>
        {filtersOpen && <University countryId={country} />}
      </div>
    </>
  )
}

export const UniversityFilters = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const universityCountries = useSelector(selectUniversityCountries)

  const toggleFilters = (e) => {
    e.stopPropagation()
    setFiltersOpen(!filtersOpen)
  }

  const UniversityCountries = universityCountries.map((country, index) => (
    <Country country={country} key={index} />
  ))

  return (
    <div>
      <div onClick={toggleFilters}>
        <h2>Образование</h2>
      </div>
      <div className={styles.filtersContainer}>
        {filtersOpen && UniversityCountries}
      </div>
    </div>
  )
}
