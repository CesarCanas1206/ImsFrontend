import styles from './loader.module.css'

export function Loader({ size = '3rem', style }: { size?: any; style?: any }) {
  return (
    <div className={styles.loaderWrapper}>
      <div
        className={styles.loader}
        style={{ ...style, width: size, height: size }}
        role="status"
      >
        <span className={styles.visuallyHidden}>Loading...</span>
      </div>
    </div>
  )
}

export default Loader
