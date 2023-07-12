import { LoadingOverlay as LoadingOverlayUI } from '@mantine/core'

interface ILoadingOverlay {
  visible: boolean
}

function LoadingOverlay({ visible = false }: ILoadingOverlay) {
  return (
    <LoadingOverlayUI
      visible={visible}
      overlayColor="rgba(241, 245, 253, .6)"
      overlayBlur={1}
      zIndex={80}
    />
  )
}

export default LoadingOverlay
