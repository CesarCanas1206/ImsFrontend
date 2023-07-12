import { Link as LinkUI } from 'react-router-dom'

function Link({ children, ...props }: any) {
  return <LinkUI {...props}>{children}</LinkUI>
}

export default Link
