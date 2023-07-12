import { useContext, useState } from 'react'
import Alert from '../../UI/Alert/Alert'
import Col from '../../UI/Col/Col'
import Group from '../../UI/Group/Group'
import Row from '../../UI/Row/Row'
import Space from '../../UI/Space/Space'
import useAPI from 'src/hooks/useAPI'
import { getObjectValue } from 'src/utilities/objects'
import Button from '../Button/Button'
import FormContext from '../../../context/FormContext'
import ModalButtonForm from '../../UI/ModalButtonForm/ModalButtonForm'
import { isEmpty } from 'src/utilities/strings'
import ModalButton from 'src/components/UI/ModalButton/ModalButton'
import Form from '../Form/Form'

function BookingAdminButtons({ row }: any) {
  const { put } = useAPI()
  const { formSaveHandler } = useContext(FormContext)
  const [generated, setGenerated] = useState(false)
  const [sent, setSent] = useState(false)

  if (typeof row.form.id === 'undefined' || !row.form.id) {
    return <></>
  }

  const approveHandler = async () => {
    const id = getObjectValue('form.id', row)
    await put({ endpoint: `d/${id}`, data: { approved: 'Yes' } })
    formSaveHandler()
    console.log('approve', getObjectValue('form.id', row))
  }

  return (
    <>
      <Row>
        <Col span={6}>
          <strong>Approval notes</strong>
          These notes are for the approval email only and will be automatically
          populated in the approval email / letter. This option is only
          available when approving bookings (visible but non-editable)
        </Col>
        <Col span={6}>
          <Alert>No notes have been added</Alert>
          <Group>
            <ModalButtonForm
              icon="Plus"
              text="Add note"
              formId="notes"
              itemId="new"
            />
          </Group>
        </Col>
      </Row>
      <Space h="md" />
      <Row>
        <Col span={6}>
          <strong>Council Only Notes (INTERNAL ONLY)</strong>
          These are notes that are not designed to be communitcated to customers
        </Col>
        <Col span={6}>
          <Alert>No notes have been added</Alert>
          <Group>
            <Button icon="Plus" text="Add note" />
          </Group>
        </Col>
      </Row>
      <Space h="lg" />
      <Group>
        {isEmpty(row.form.approved) && (
          <Button
            link={`/application/${row.form.slug}/${row.form.id}`}
            variant="primary"
            text="Edit booking"
          />
        )}
        {isEmpty(row.form.approved) && (
          <ModalButtonForm
            variant="danger"
            text="Decline booking"
            formId="notes"
            itemId="new"
          />
        )}
        {/* <Button variant="primary" text="Reset booking" /> */}
        {isEmpty(row.form.approved) && (
          <Button
            variant="success"
            text="Approve booking"
            onClick={approveHandler}
          />
        )}
        {!isEmpty(row.form.approved) && (
          <>
            {generated && (
              <ModalButton text="View invoice">
                {!sent && (
                  <>
                    <Form
                      formId="invoice"
                      itemId="8b2f2c68-af04-4db1-86e4-bab1f2399bf8"
                    />
                    <Button
                      variant="success"
                      text="Send invoice"
                      onClick={() => setSent(true)}
                    />
                  </>
                )}
                {sent && (
                  <Alert color="green" icon="Info" text="Invoice emailed!" />
                )}
              </ModalButton>
            )}
            {!generated && (
              <Button
                variant="success"
                text="Generate invoice"
                onClick={() => setGenerated(true)}
              />
            )}
          </>
        )}
        {/* {isEmpty(row.form.approved) && (
          <Button variant="info" text="Calendar" link="/calendar" />
        )} */}
      </Group>
    </>
  )
}

export default BookingAdminButtons
