import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import useAPI from '../../../hooks/useAPI'
import FormSelector from '../../Form/FormSelector/FormSelector'
import HirerSelector from '../../Form/HirerSelector/HirerSelector'
import { useMediaQuery } from '@mantine/hooks'
import colStyles from '../../UI/Col/col.module.css'
import styles from '../../Form/Question/question.module.css'
import Stack from '../Stack/Stack'
import Group from '../Group/Group'
import Heading from '../Heading/Heading'

/**
 * AddNewBooking
 * Used to start a new casual booking
 * @param param0
 * @returns
 */
function AddNewBooking({
  text,
  icon,
  fullWidth,
  type = 'casual',
  hirer_id,
  endpoint,
  usageData,
  ...props
}: any) {
  let navigate = useNavigate()
  const { post } = useAPI()
  const [loading, setLoading] = useState(false)
  const [formId, setFormId] = useState('')
  const [hirerId, setHirerId] = useState(hirer_id)
  const isMobile = useMediaQuery('(max-width: 677px)')

  const newBookingHandler = async () => {
    setLoading(true)
    const result = await post({
      endpoint: `booking`,
      data: {
        form_id: formId,
        parent_id: hirerId,
        hirer_id: hirerId,
        type: type,
      },
    })

    if (
      typeof usageData !== 'undefined' &&
      typeof usageData.asset_id !== 'undefined'
    ) {
      const hasTimes = usageData.start !== usageData.end
      await post({
        endpoint: `usage`,
        data: {
          form_id: 'casualusage',
          parent_id: result.id,
          asset_id: usageData.asset_id,
          date: usageData.date,
          start: hasTimes ? usageData.start?.split(' ')[1] : '16:30',
          end: hasTimes ? usageData.end?.split(' ')[1] : '19:30',
          title: 'Booking',
        },
      })
    }

    navigate(`/application/` + result.id)
    setLoading(false)
  }

  const changeHandler = ({ name, value }: any) => {
    if (name === 'formId') {
      setFormId(value)
    }
    if (name === 'hirerId') {
      setHirerId(value)
    }
  }

  if (loading) {
    return <></>
  }

  const colWidthText = isMobile ? colStyles.col12 : colStyles.col4
  const colWidthAnswer = isMobile ? colStyles.col12 : colStyles.col8

  return (
    <Stack>
      <Heading>Add new booking</Heading>
      <div
        key="application"
        className={styles.questionRow}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        {isMobile ? (
          <>
            <div style={{ width: '100%' }}>
              <div className={colWidthText} key="label">
                Application
              </div>
              <div className={colWidthAnswer} key="answer">
                <FormSelector
                  category="casual"
                  onChange={changeHandler}
                  name="formId"
                  value={formId}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <label
              className={colWidthText}
              key="label"
              style={{
                marginBottom: isMobile ? '5px' : 'inherit',
              }}
            >
              Application
            </label>
            <div className={colWidthAnswer} key="answer">
              <FormSelector
                category="casual"
                onChange={changeHandler}
                name="formId"
                value={formId}
              />
            </div>
          </>
        )}
      </div>
      <div
        key="hirer"
        className={styles.questionRow}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        {isMobile ? (
          <>
            <div style={{ width: '100%' }}>
              <div className={colWidthText} key="label">
                Hirer
              </div>
              <div className={colWidthAnswer} key="answer">
                <HirerSelector
                  onChange={changeHandler}
                  name="hirerId"
                  value={hirerId}
                  readOnly={typeof hirer_id !== 'undefined'}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <label
              className={colWidthText}
              key="label"
              style={{
                marginBottom: isMobile ? '5px' : 'inherit',
              }}
            >
              Hirer
            </label>
            <div className={colWidthAnswer} key="answer">
              <HirerSelector
                onChange={changeHandler}
                name="hirerId"
                value={hirerId}
                readOnly={typeof hirer_id !== 'undefined'}
              />
            </div>
          </>
        )}
      </div>
      {formId && hirerId && (
        <Group position="right">
          <Button
            {...props}
            icon={icon}
            text={loading ? 'Creating' : 'Start application'}
            disabled={loading}
            onClick={newBookingHandler}
          />
        </Group>
      )}
    </Stack>
  )
}

export default AddNewBooking
