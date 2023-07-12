import Stack from '../../UI/Stack/Stack'
import Skeleton from '../../UI/Skeleton/Skeleton'

function InspectionLoadingSkeleton() {
  return (
    <>
      <Stack>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
        <Skeleton style={{ width: '100%' }} height={200} mb={5} />
        <Skeleton style={{ width: '100%' }} height={200} mb={5} />
        <Skeleton style={{ width: '100%' }} height={200} mb={5} />
      </Stack>
    </>
  )
}

export default InspectionLoadingSkeleton
