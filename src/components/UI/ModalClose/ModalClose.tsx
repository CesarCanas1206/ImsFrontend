import { useContext } from 'react'
import Button from '../../Form/Button/Button'
import ModalContext from '../../../context/ModalContext'

function ModalClose() {
  const { onClose } = useContext(ModalContext)

  return <Button onClick={onClose} variant="secondary" text="Close" />
}

export default ModalClose
