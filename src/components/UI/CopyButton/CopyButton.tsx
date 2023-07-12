import { CopyButton as CopyButtonUI } from '@mantine/core'
import Button from 'src/components/Form/Button/Button'

function CopyButton({ value, text = 'Copy' }: any) {
  return (
    <CopyButtonUI value={value}>
      {({ copied, copy }) => (
        <Button
          icon="Copy"
          variant={copied ? 'primary' : 'secondary'}
          onClick={copy}
          text={copied ? 'Copied!' : text}
        />
      )}
    </CopyButtonUI>
  )
}

export default CopyButton
