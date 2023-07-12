import { useContext } from 'react'
import Group from 'src/components/UI/Group/Group'
import AppContext from 'src/context/AppContext'
import PageContext from 'src/context/PageContext'

export const settings = [
  {
    name: 'title',
    label: 'Title',
    type: 'Input',
    default: 'New title',
  },
]

export function PageTitle({
  children,
  title = '',
}: {
  children?: React.ReactNode
  title?: string
}) {
  const { runAction } = useContext(PageContext)
  const { page } = useContext(AppContext)

  title = runAction({ id: 'pageTitle' }) || page?.name || title || ''
  if (title === '') {
    return <></>
  }

  return (
    <h4
      style={{
        marginTop: 0,
        marginBottom: 30,
        fontSize: 38,
        fontWeight: 600,
        color: 'var(--c-text, #1A1C1E)',
      }}
    >
      <Group position="right" align="start">
        <span style={{ marginRight: 'auto' }}>{title}</span>
        {typeof children !== 'undefined' && <>{children}</>}
      </Group>
    </h4>
  )
}

export default PageTitle
