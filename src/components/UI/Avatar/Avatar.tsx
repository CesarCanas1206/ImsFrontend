import React from 'react'

const formatUrlSize = (src: string, size: number) => {
  return `${src}?w=${size ?? 48}&c=1`
}

export interface IAvatar {
  src?: any
  size?: number
  rounded?: boolean
}

function Avatar({ src, size = 48, rounded = true }: IAvatar) {
  return (
    <img
      src={formatUrlSize(src?.value ?? src, size)}
      alt=""
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? '50%' : 4,
        overflow: 'hidden',
        objectFit: 'cover',
      }}
      loading="lazy"
    />
  )
}

export default Avatar
