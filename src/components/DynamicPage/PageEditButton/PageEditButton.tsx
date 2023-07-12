import { useContext } from 'react'
import AppContext from '../../../context/AppContext'
import Button from '../../Form/Button/Button'

export interface IPageEditButton {}

function PageEditButton() {
  const { setEditMode, editMode } = useContext(AppContext)
  return (
    <Button
      onClick={() => setEditMode(!editMode)}
      style={{ marginRight: 6, marginBottom: 4 }}
      icon={'gears'}
      variant="secondary"
      tooltip="Toggle edit mode"
      compact={true}
    />
  )
}

export default PageEditButton
