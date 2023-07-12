import useHasPermission from '../../../hooks/useHasPermission'

function HasPermission({ permission, children }: any) {
  const { hasPermission } = useHasPermission()
  const check = hasPermission(permission ?? 'admin')

  if (!check) {
    return <></>
  }

  return <>{children}</>
}

export default HasPermission
