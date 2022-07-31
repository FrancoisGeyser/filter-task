import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  addFilters,
  excludeFilters,
  activeFilter,
} from '../../store/reducers/filterSlice'
import styles from './filterToggle.module.css'

export const FilterToggle = ({
  children,
  parent = false,
  cb,
  label,
  dataKey,
  dataValue,
}) => {
  const [showToggles, setShowToggles] = useState(false)
  const [activeToggle, setActiveToggle] = useState(null)
  const toggles = {
    excl: 'excludeFilter',
    incl: 'addFilter',
  }

  const addFilterState = useSelector(addFilters)
  const excludeFilterState = useSelector(excludeFilters)

  useEffect(() => {
    if (parent) return
    const isActiveAddFilter = activeFilter(dataKey, dataValue, addFilterState)
    const isActiveExcludeFilter = activeFilter(
      dataKey,
      dataValue,
      excludeFilterState
    )
    if (isActiveAddFilter) {
      setActiveToggle(toggles.incl)
    } else if (isActiveExcludeFilter) {
      setActiveToggle(toggles.excl)
    } else {
      setActiveToggle(null)
    }
  }, [addFilterState, excludeFilterState])

  const cbHandler = (toggle, action) => {
    cb(`${toggle}/${action}${label}`)
  }

  const toggleHandler = (e) => {
    const { id } = e.target
    e.stopPropagation()
    if (id === activeToggle) {
      cbHandler(id, 'remove')
      parent && setActiveToggle(null)
    } else if (!activeToggle) {
      cbHandler(id, 'add')
      parent && setActiveToggle(id)
    } else {
      cbHandler(activeToggle, 'remove')
      cbHandler(id, 'add')
      parent && setActiveToggle(id)
    }
  }

  return (
    <div
      className={styles.filter}
      onMouseOver={() => setShowToggles(true)}
      onMouseLeave={() => setShowToggles(false)}
    >
      <div
        className={styles.filterContainer}
        style={{
          visibility: showToggles ? 'visible' : 'hidden',
        }}
      >
        or
      </div>
      <div
        id="excludeFilter"
        className={styles.filterToggle}
        style={{
          backgroundColor: toggles.excl === activeToggle && 'red',
          visibility:
            showToggles || activeToggle === toggles.excl ? 'visible' : 'hidden',
        }}
        onClick={(e) => toggleHandler(e)}
      >
        -
      </div>
      <div
        id="addFilter"
        className={styles.filterToggle}
        style={{
          backgroundColor: toggles.incl === activeToggle && 'green',
          visibility:
            showToggles || activeToggle === toggles.incl ? 'visible' : 'hidden',
        }}
        onClick={(e) => toggleHandler(e)}
      >
        +
      </div>
      <div className={styles.filterLabel}>{children}</div>
    </div>
  )
}
