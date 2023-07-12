function Grid({ children }: any) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
    >
      {children}
    </div>
  )
}

export default Grid
