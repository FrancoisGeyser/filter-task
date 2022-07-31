export const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues)
}

export const removeItemFromArray = (array, oldItem) => {
  if (!array.includes(oldItem)) {
    return array
  }
  const cleanedArray = [...array].filter((item) => item !== oldItem)
  return cleanedArray
}

export const addItemInArray = (array, newItem) => {
  if (array.includes(newItem)) {
    return array
  }
  const updatedArray = [...array, newItem]
  return updatedArray
}

export const removeItemsFromArray = (array, oldItems) => {
  if (oldItems.length === 0) {
    return array
  }
  const oldItem = oldItems.pop()
  if (!array.includes(oldItem)) {
    return removeItemsFromArray(array, oldItems)
  }
  const cleanedArray = [...array].filter((item) => item !== oldItem)
  return removeItemsFromArray(cleanedArray, oldItems)
}

export const addItemsInArray = (array, newItems) => {
  if (newItems.length === 0) {
    return array
  }
  const newItem = newItems.pop()
  if (array.includes(newItem)) {
    return addItemsInArray(array, newItems)
  }
  const updatedArray = [...array, newItem]
  return addItemsInArray(updatedArray, newItems)
}

export const updaterAdd = (state, action, label) => {
  const stateCopy = [...state[label]]
  let newData
  if (typeof action.payload === 'string') {
    newData = [action.payload]
  } else {
    newData = [...action.payload]
  }
  const newState = addItemsInArray(stateCopy, newData)
  return updateObject(state, { [label]: newState })
}

export const updaterRemove = (state, action, label) => {
  const stateCopy = [...state[label]]
  let newData
  if (typeof action.payload === 'string') {
    newData = [action.payload]
  } else {
    newData = [...action.payload]
  }
  const newState = removeItemsFromArray(stateCopy, newData)
  return updateObject(state, { [label]: newState })
}
