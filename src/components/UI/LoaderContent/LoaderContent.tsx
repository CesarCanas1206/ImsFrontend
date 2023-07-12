import Skeleton from '../Skeleton/Skeleton'

function LoaderContent({
  justContent = false,
  noTitle = true,
  noButton = false,
  cards = false,
  style,
}: {
  noTitle?: boolean
  justContent?: boolean
  noButton?: boolean
  cards?: boolean
  style?: object
}) {
  return (
    <div style={{ marginTop: justContent ? 10 : 0, ...style }}>
      {!noTitle && <Skeleton width={'100%'} height={40} mb={10} />}
      {!noButton && <Skeleton width={150} height={40} mb={10} />}
      {!cards && <Skeleton width={'100%'} height={600} />}
      {cards &&
        Array(2)
          .fill(null)
          .map((_: any, idx: number) => (
            <Skeleton key={idx} width={'100%'} height={70} mb={12} />
          ))}
    </div>
  )
}

export default LoaderContent
