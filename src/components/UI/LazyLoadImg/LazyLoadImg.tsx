import React, { useState } from 'react'
import Loader from '../Loader/Loader'

function LazyLoadImg({ src, className, alt, height }: any) {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return (
      <div
        className={className}
        style={{
          height: height ?? 150,
          width: '80%',
          borderRadius: '25%',
          filter: 'brightness(1.5)',
        }}
      >
        <img
          src={src}
          style={{ visibility: 'hidden', height: 0 }}
          onLoad={() => setLoading(false)}
        />
        <Loader />
      </div>
    )
  }

  return (
    <img
      alt={alt}
      src={src}
      className={className}
      style={{ maxWidth: '80%' }}
    />
  )
}

export default LazyLoadImg
