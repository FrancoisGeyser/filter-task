import { universityActions } from '../store/reducers/universitySlice'
import { countryActions } from '../store/reducers/countrySlice'

export async function fetchUniversities(dispatch, state) {
  const response = await fetch(
    'https://universities.hipolabs.com/search?name=university'
  )
  const data = await response.json()
  const sanitizedArray = data.reduce((ag, e) => {
    ag.push({ country: e.country, university: e.name })
    return ag
  }, [])
  const sanitized = sanitizedArray.reduce((ag, e) => {
    if (ag[e.country]) {
      ag[e.country].push(e.university)
      return ag
    } else {
      ag[e.country] = []
      ag[e.country].push(e.university)
      return ag
    }
  }, {})
  dispatch(universityActions.addAll(sanitized))
}

export async function fetchCountries(dispatch, state) {
  const response = await fetch(
    'https://countriesnow.space/api/v0.1/countries/states'
  )
  const { data } = await response.json()

  const sanitized = data.reduce((ag, e) => {
    ag.push({ country: e.name, states: e.states })
    return ag
  }, [])
  dispatch(countryActions.addCountries(sanitized))
}

export async function fetchCities(dispatch, state, dataToSend) {
  const url = 'https://countriesnow.space/api/v0.1/countries/state/cities'
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let raw = JSON.stringify(dataToSend)

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(url, requestOptions)
  const { data } = await response.json()
  const sanitized = {
    ...dataToSend,
    cities: data,
  }
  dispatch(countryActions.addStates(sanitized))
}
