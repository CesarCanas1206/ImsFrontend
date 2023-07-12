import Skeleton from '../Skeleton/Skeleton'

function CalendarSkeleton() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Skeleton width={60} height={40} />
          <Skeleton width={90} height={40} mx={15} />
        </div>
        <Skeleton width={170} height={40} mx={15} />
        <Skeleton width={170} height={40} mx={15} />
      </div>
      <Skeleton width="100%" height={500} mt={10} />
    </>
  )
}

export default CalendarSkeleton
