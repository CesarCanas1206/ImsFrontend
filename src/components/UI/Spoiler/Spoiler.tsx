import { Spoiler as SpoilerUI } from '@mantine/core'

function Spoiler({ children, maxHeight }: any) {
  return (
    <SpoilerUI
      maxHeight={Number(maxHeight || 220)}
      showLabel="Show more"
      hideLabel="Hide"
    >
      {children}
    </SpoilerUI>
  )
}

export default Spoiler
