import { Image as ImageUI } from '@mantine/core'
import React, { lazy, useState } from 'react'
import Modal from '../Modal/Modal'
const Carousel = lazy(() => import('../Carousel/Carousel'))

export const settings = [
  {
    name: 'src',
    label: 'Image path',
    type: 'Input',
    default: '',
  },
]

interface IImage {
  src: any
  alt?: any
  radius?: any
  width?: any
  height?: any
  style?: any
  gallery?: boolean
  props?: any
  fit?: any
  cname?: any
}

export function Image({
  src,
  gallery = false,
  style,
  width,
  height,
  cname,
  ...props
}: IImage) {
  const [show, setShow] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)

  let images = src

  if (
    typeof src === 'string' &&
    src?.substring(0, 1) === '[' &&
    src?.substring(0, 3) !== '[ob'
  ) {
    images = JSON.parse(src)
  } else if (typeof src === 'string') {
    images = src?.includes('base64,') ? [src] : src?.split(',')
  } else if (
    typeof src?.value !== 'undefined' ||
    typeof src?.path !== 'undefined'
  ) {
    images = [src]
  }

  if ((typeof src === 'string' && src?.substring(0, 3) === '[ob') || !images || Object.keys(images).length === 0 || (Array.isArray(images) && (images.length === 0))) {
    if (gallery) {
      images = (props as any).details?.gallery      
    } else {
      images = [(props as any).details?.photo?.value]
    }
  }
  
  if (!images || !Array.isArray(images)) {
    return null;
  }

  return (
    <>
      {images?.map((img: any, idx: number) => (
        <ImageUI
          src={img?.path ?? img?.value ?? img}
          key={img?.path ?? img?.value ?? img}
          onClick={() => {
            setInitialSlide(idx)
            setShow(true)
          }}
          style={{
            cursor: gallery ? 'pointer' : 'inherit',
            ...(style ?? {}),
          }}
          className={cname ?? ""}
          withPlaceholder
          alt="Image"
          {...props}
          height={height}
          width={width}
        />
      ))}
      {gallery && (
        <Modal
          zIndex={1060}
          size="90%"
          show={show}
          onClose={() => setShow(false)}
        >
          {show && <Carousel initialSlide={initialSlide} images={images} />}
        </Modal>
      )}
    </>
  )
}

export default Image
