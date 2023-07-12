import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function useHasPermission() {
  const { permissions } = useContext(AuthContext)

  const hasPermission = (permission: any, userPermissions?: any) => {
    if (typeof permission === 'undefined' || !permission || permission === '') {
      return true
    }
    const checking =
      typeof userPermissions !== 'undefined' ? userPermissions : permissions

    const found =
      checking && checking?.split(',').find((p: any) => p === permission)
    return found ?? false
  }

  return {
    hasPermission,
  }
}

export default useHasPermission
