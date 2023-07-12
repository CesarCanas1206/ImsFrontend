import {
  Carousel as CarouselUI,
  useAnimationOffsetEffect,
} from '@mantine/carousel'
import { useState } from 'react'

interface ICarousel {
  images: any
  initialSlide?: number
}

function Carousel({ images, initialSlide = 0 }: ICarousel) {
  const [embla, setEmbla] = useState<any>(null)

  useAnimationOffsetEffect(embla, 200)

  return (
    <CarouselUI
      loop
      getEmblaApi={setEmbla}
      initialSlide={initialSlide}
      withIndicators={images?.length > 1}
      withControls={images?.length > 1}
      height={500}
      styles={{
        indicator: { background: 'var(--c-link, #aaa)' },
      }}
    >
      {images.map((img: any) => (
        <CarouselUI.Slide
          key={img}
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={img?.value ?? img} style={{ maxHeight: '100%' }} />
        </CarouselUI.Slide>
      ))}
    </CarouselUI>
  )
}

export default Carousel
