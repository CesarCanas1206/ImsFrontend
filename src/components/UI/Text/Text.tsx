import { Text as TextUI } from '@mantine/core'

export const settings = [
  {
    name: 'text',
    label: 'Text',
    type: 'Input',
    default: '',
  },
]
/**
 * Text
 * @param text text to display
 * @param props available props as per mantine-text
 * align, color, gradient, italic, size, weight,
 * @returns
 */
export function Text({ text, children, ...props }: any) {
  return <TextUI {...props}>{text || children}</TextUI>
}

export default Text
