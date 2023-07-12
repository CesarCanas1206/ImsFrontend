import { useCallback, useContext } from 'react'
import useAPI from '../../hooks/useAPI'
import Button from '../Form/Button/Button'
import DataGridContext from '../../context/DataGridContext'
import ModalButton from '../UI/ModalButton/ModalButton'
import Form from '../Form/Form/Form'

function CreateDynamicItem({ type, item }: any) {
  const { post } = useAPI()
  const { reloadTable } = useContext(DataGridContext)

  const changeHandler = useCallback(async () => {
    const inTables = ['form', 'page', 'dataset', 'role', 'permission']

    delete item.registry

    await post({
      endpoint: inTables.includes(type) ? type : `d/${type.replace('d/', '')}`,
      data: inTables.includes(type)
        ? item
        : {
            ...item,
            slug: type.replace('d/', ''),
          },
    })
    reloadTable()
  }, [])

  if (typeof type === 'undefined') {
    return <></>
  }

  return (
    <>
      <Button
        tooltip="Make this item customisable"
        icon="copy"
        onClick={changeHandler}
        compact
      />
      {type === 'form' && (
        <ModalButton icon="search" tooltip="Preview form" compact="true">
          <Form formId={item.reference} hideSave />
        </ModalButton>
      )}
    </>
  )
}

export default CreateDynamicItem
