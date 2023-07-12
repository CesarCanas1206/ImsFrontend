import { useContext, useEffect, useRef } from 'react'
import AuthContext from 'src/context/AuthContext'
import { get } from 'src/hooks/useAPI'

function Logout() {
  const { logout } = useContext(AuthContext)
  const ref = useRef<any>(false)

  const doLogout = async () => {
    if (ref.current) return
    await get({ endpoint: 'logout' })
    await logout()

    window.location.href = window.location.href.replace('logout', 'login')
  }

  useEffect(() => {
    if (!ref.current) {
      doLogout()
      ref.current = true
    }
  }, [])

  return (
    <>
      <div
        style={{
          height: 40,
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          background: '#337ab7',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '80px auto 0',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <h3>Logging out..</h3>
      </div>
    </>
  )
}

export default Logout
