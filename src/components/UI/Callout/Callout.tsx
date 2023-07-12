import style from './callout.module.css'

export function Callout({ children, variant = 'primary' }: any) {
  return (
    <div className={[style.callout, style[`callout-${variant}`]].join(' ')}>
      {children}
    </div>
  )
}

export default Callout
