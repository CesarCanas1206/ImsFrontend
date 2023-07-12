import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

function LoaderModal() {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_: any, idx: number) => (
          <Skeleton key={idx} width={'100%'} height={40} mb={10} />
        ))}
    </>
  )
}

export default LoaderModal
