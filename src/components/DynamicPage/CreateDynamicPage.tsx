import usePage from '../../hooks/usePage'
import usePageBuilder from '../../hooks/usePageBuilder'
import Button from '../Form/Button/Button'

export default function CreateDynamicPage() {
  const { page } = usePage()
  const { createAsDynamicPage } = usePageBuilder()

  return (
    <Button
      tooltip="Make this page customisable"
      icon="copy"
      variant="secondary"
      onClick={() => createAsDynamicPage(page)}
      compact
      style={{ marginRight: 5 }}
    />
  )
}
