import React, { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import Group from '../../UI/Group/Group'
import Button from '../Button/Button'
import FileUploader from '../FileUploader/FileUploader'

export function Signature({ onChange, value: sentValue, readOnly }: any) {
  const ref: any = useRef<any>()
  const [editing, setEditing] = useState(true)

  const value =
    (typeof sentValue !== 'undefined' && sentValue?.value) ??
    sentValue?.path ??
    sentValue[0]?.path ??
    sentValue ??
    ''

  const changeHandler = () => {
    if (typeof onChange !== 'undefined') {
      onChange({ value: ref.current.toDataURL() })
    }
    setEditing(false)
  }

  useEffect(() => {
    if (ref.current && value !== '' && value.length > 5) {
      setEditing(false)
    }
  }, [value])

  if (readOnly) {
    return (
      <>
        {value !== '' && (
          <img src={value} alt="" style={{ maxWidth: '100%' }} />
        )}
      </>
    )
  }

  return (
    <>
      {editing && (
        <>
          <div>
            <SignatureCanvas
              ref={ref}
              canvasProps={{
                width: 350,
                height: 100,
                style: {
                  aspectRatio: 'auto',
                  border: '1px solid #ccc',
                  padding: 2,
                },
              }}
            />
          </div>
          <Group>
            {value !== '' && (
              <Button
                onClick={() => setEditing(false)}
                icon="Cancel"
                variant="secondary"
                tooltip="Cancel drawing the signature"
              />
            )}
            <Button
              onClick={() => ref.current.clear()}
              icon="Sweep"
              tooltip="Clear the drawn signature"
            />
            <Button
              onClick={changeHandler}
              text="Save"
              icon="Save"
              tooltip="Save current drawn signature"
            />
            <FileUploader
              text={'Upload file'}
              icon={'file'}
              defaultValue={value}
              withPreview={false}
              onSuccess={(file: any) => {
                onChange(file)
                setEditing(false)
              }}
            >
              <Button
                onClick={changeHandler}
                icon="Upload"
                tooltip="Upload a signature image"
              />
            </FileUploader>
          </Group>
        </>
      )}
      {!editing && (
        <>
          {value !== '' && (
            <div>
              <img src={value} alt="" style={{ maxWidth: '100%' }} />
            </div>
          )}

          <Button
            style={{ marginTop: 8 }}
            onClick={() => setEditing(true)}
            text="Edit"
            tooltip="Edit/set the signature"
            icon="Signature"
          />
        </>
      )}
    </>
  )
}

export default Signature
