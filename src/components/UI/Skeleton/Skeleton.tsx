import { Skeleton as SkeletonUI } from '@mantine/core'

function Skeleton(props: any) {
  return (
    <SkeletonUI
      style={{ background: 'var(--c-skeleton, #ffffff)' }}
      radius="md"
      {...props}
    />
  )
}

export default Skeleton
