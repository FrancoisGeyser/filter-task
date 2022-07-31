import { UniversityFilters } from './UniversityFilters'
import { CountryFilters } from './CountryFilters'
import styles from './displayFilters.module.css'

export const DisplayFilters = () => {
  return (
    <div className={styles.filtersDisplay}>
      <UniversityFilters />
      <CountryFilters />
    </div>
  )
}
