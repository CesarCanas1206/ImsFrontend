import { SimpleGrid as SimpleGridUI } from '@mantine/core'

function SimpleGrid({ children, cols = 3 }: any) {
  return (
    <SimpleGridUI
      breakpoints={[
        { minWidth: 'xs', cols: 1 },
        { minWidth: 'sm', cols: !cols || cols < 2 ? cols : 2 },
        { minWidth: 'md', cols },
      ]}
    >
      {children}
    </SimpleGridUI>
  )
}

export default SimpleGrid
