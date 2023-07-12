import { Progress as ProgressUI } from '@mantine/core'

function Progress({ value = 75 }: any) {
  return (
    <ProgressUI
      color="#C7F8C7"
      value={value}
      label={value + '%'}
      size={27}
      radius={4}
      styles={{
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#419641',
        },
        label: {
          color: '#419641',
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    />
  )
}

export default Progress
