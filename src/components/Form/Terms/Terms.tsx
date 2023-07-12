import React, { useContext, useState } from 'react'
import Stack from '../../UI/Stack/Stack'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Checkbox from '../Checkbox/Checkbox'
import FormContext from '../../../context/FormContext'
import { useQuery } from 'react-query'
import useAPI from 'src/hooks/useAPI'
import { isEmpty } from 'src/utilities/strings'
import FormHeading from '../Form/formHeading/FormHeading'
import Space from 'src/components/UI/Space/Space'

interface ITerms {
  file?: any
  onChange?: any
  name?: any
  endpoint?: any
  readOnly?: any
  getValueFn?: any
  declaration?: string
  privacyHeading?: string
  privacy?: string
  onBehalf?: string
}

function Terms({
  file,
  onChange,
  name = 'Terms and conditions',
  endpoint = 'terms',
  readOnly,
  getValueFn,
  declaration,
  privacyHeading,
  privacy,
  onBehalf,
}: ITerms) {
  const [read, setRead] = useState(false)
  const { getValue } = useContext(FormContext) ?? {
    getValue: typeof getValueFn !== 'undefined' ? getValueFn : () => {},
  }
  const { get } = useAPI()

  const { data, isLoading } = useQuery({
    queryKey: ['terms', endpoint],
    queryFn: async () =>
      await get({ endpoint: 'd/booking-document?type=' + endpoint }),
  })

  if (!isLoading && typeof data !== 'undefined' && data.length) {
    file = data[0].file?.value ?? file
  }

  const value = getValue('terms_agreed')

  const clickHandler = () => {
    setRead(true)
  }

  const changeHandler = ({ value }: any) => {
    onChange({ ref: 'terms_agreed', value })
  }

  return (
    <Stack>
      <div>
        {typeof declaration !== 'undefined' ? (
          <>
            {declaration}
            <Space h="md" />
          </>
        ) : (
          <>
            I/We state that I/We are authorised to make application to Council
            for use of facilities and open space and confirm that <br />
            <br />
            I/We have read and understood the club's obligations as outlined in
            the "{name}".
            <br />
            <br />
            I/We agree that by signing we bind the club contractually and upon
            approval and Council's acceptance of this application the club
            accepts and agrees to use the facilities named on this form abiding
            by all terms and conditions contained in Council's standard "{name}
            ".
          </>
        )}
        {typeof privacyHeading !== 'undefined' && (
          <FormHeading>{privacyHeading}</FormHeading>
        )}
        {typeof privacy !== 'undefined' && privacy}
      </div>
      {!readOnly && (
        <>
          <div>
            Please read the Terms and Conditions before ticking the checkbox to
            accept these Terms and Conditions.
          </div>
          <div>
            <ModalButton
              icon="Pdf"
              onClick={clickHandler}
              tooltip="View terms and conditions"
              text="Terms and conditions"
              fullscreen
            >
              <iframe
                title="Terms and Conditions"
                src={
                  file ??
                  'https://apps.imscomply.com.au/ims-api/storage/stonningtonnew/167765977417.pdf'
                }
                style={{ width: '100%', height: '100%', minHeight: 600 }}
              ></iframe>
            </ModalButton>
          </div>
        </>
      )}
      <Checkbox
        disabled={readOnly || (!read && isEmpty(value))}
        onChange={!readOnly ? changeHandler : undefined}
        value={value}
        label={
          typeof onBehalf !== 'undefined'
            ? onBehalf
            : 'I, on behalf of the club, agree to all terms and conditions set out in the seasonal licence agreement'
        }
      />
    </Stack>
  )
}

export default Terms
