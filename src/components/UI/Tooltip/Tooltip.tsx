import { Tooltip as TooltipUI } from '@mantine/core'

function Tooltip({
  children,
  label,
  zIndex,
  multiline,
  withinPortal = true,
}: any) {
  return (
    <TooltipUI
      label={label}
      withArrow
      multiline={multiline}
      zIndex={zIndex}
      withinPortal={withinPortal}
    >
      {children}
    </TooltipUI>
  )
}

export default Tooltip
