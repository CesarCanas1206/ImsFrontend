import { useContext } from 'react'
import AppContext from '../context/AppContext'

function useIsOwner() {
  const { siteName } = useContext(AppContext)
  const userId = localStorage.getItem(`${siteName}-userId`)

  const checkOwner = (checkUserId: string) => {
    return checkUserId === userId
  }

  return {
    checkOwner,
  }
}

export default useIsOwner
