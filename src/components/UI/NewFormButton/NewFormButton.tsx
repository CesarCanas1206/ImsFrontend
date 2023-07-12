import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/Form/Button/Button'
import useAPI from '../../../hooks/useAPI'

function NewFormButton({
  text,
  icon,
  fullWidth,
  formId,
  parent_id,
  specific_id,
  type = 'application',
  data,
  endpoint,
  ...props
}: any) {
  let navigate = useNavigate()
  const { post } = useAPI()
  const [loading, setLoading] = useState(false)

  const newFormHandler = async () => {
    setLoading(true)
    const result = await post(
      type === 'application'
        ? {
            endpoint: endpoint ?? `booking`,
            data: {
              form_id: formId,
              parent_id,
              specific_id,
              ...data,
            },
          }
        : {
            endpoint: endpoint ?? `d/${formId}`,
            data: {
              form_id: formId,
              slug: endpoint?.replace('d/', '') ?? formId,
              ['ai::inspection_id']: 0,
              parent_id,
              specific_id,
              ...data,
            },
          },
    )

    if (formId === 'casual') {
      formId = 'casual-booking'
    }
    navigate(`/${type}/${formId}/` + result.id, { replace: true })
    setLoading(false)
  }

  return (
    <Button
      {...props}
      icon={icon}
      text={loading ? 'Creating' : text}
      disabled={loading}
      fullWidth={fullWidth}
      onClick={newFormHandler}
    />
  )
}

export default NewFormButton
