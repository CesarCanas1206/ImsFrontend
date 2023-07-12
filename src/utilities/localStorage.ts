export const siteName = window.location.pathname.split('/')[1].trim()

// Get string from local storage based on key
export const storageGet = (key: string) =>
  localStorage.getItem(siteName + '-' + key) || ''

// Get array from local storage based on key
export const storageGetArray = (key: string) =>
  JSON.parse(localStorage.getItem(siteName + '-' + key) || '[]')

// Set local storage item
export const storageSet = (key: string, value: string | object) =>
  localStorage.setItem(
    siteName + '-' + key,
    typeof value === 'string' ? value : JSON.stringify(value),
  )

// Remove from local storage based on key
export const storageRemove = (key: string) =>
  localStorage.removeItem(siteName + '-' + key)
