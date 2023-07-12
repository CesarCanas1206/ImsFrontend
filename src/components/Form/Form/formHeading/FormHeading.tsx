type IHeading = {
  text?: string
  children?: any
  style?: object
}

export function FormHeading({ text, children, style }: IHeading) {
  return (
    <div
      style={{
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5,
        padding: 10,
        color: 'white',
        backgroundColor: 'var(--c-side, #2E53DA)',
        backgroundImage: 'linear-gradient(60deg, rgba(0,0,0,.2), transparent)',
        backgroundAttachment: 'fixed',
        ...style,
      }}
    >
      {text || children}
    </div>
  )
}

export default FormHeading
