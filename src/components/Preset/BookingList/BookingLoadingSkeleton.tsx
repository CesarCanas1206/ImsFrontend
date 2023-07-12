import Skeleton from '../../UI/Skeleton/Skeleton'
import Group from '../../UI/Group/Group'

function BookingLoadingSkeleton() {
  return (
    <>
      <Skeleton width={'100%'} height={100} mb={20} />
      <div style={{ display: 'flex', gap: 30 }}>
        <div style={{}}>
          <Skeleton
            width={'100%'}
            style={{ maxWidth: '100%' }}
            height={300}
            mb={20}
          />
          <Skeleton
            width={'100%'}
            style={{ maxWidth: '100%' }}
            height={200}
            mb={20}
          />
          <Skeleton
            width={'100%'}
            style={{ maxWidth: '100%' }}
            height={200}
            mb={20}
          />
        </div>
      </div>
    </>
  )
}

export default BookingLoadingSkeleton
