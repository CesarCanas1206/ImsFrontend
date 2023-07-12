import React from 'react'
import { isEmpty } from 'src/utilities/strings'
import Image from '../../UI/Image/Image'
import { Button } from '../Button/Button'
import FileUploader from '../FileUploader/FileUploader'

export function File({ readOnly, onChange, multiple, value, ...props }: any) {
  const successHandler = ({ remove, ...file }: any) => {
    if (multiple) {
      if (remove) {
        onChange({
          value: [...value].filter((item: any) => item.value !== remove),
        })
        return
      }
      if (isEmpty(value) || value === '[]') {
        onChange({ value: Array.isArray(file) ? file : [file] })
      } else {
        onChange({ value: [...value, ...(Array.isArray(file) ? file : [file])] })
      }
      return
    }
    if (!file?.value) {
      onChange({ value: '' })
    } else {
      onChange({ value: file })
    }
  }

  if (readOnly) {
    return (
      <>
        {value?.length !== 0 && (
          <Image src={value} gallery style={{ maxWidth: 300 }} />
        )}
      </>
    )
  }

  return (
    <FileUploader defaultValue={value} onSuccess={successHandler}>
      <Button text={'Upload photo'} icon="File" />
    </FileUploader>
  )
}

export default File
