import NavMenu from './NavMenu'
import menuStyle from './navMenu.module.css'

export default function Navs({ toggleButton, children }: any) {
  return (
    <div className={menuStyle.nav}>
      {toggleButton}
      {children}
      <NavMenu />
    </div>
  )
}
