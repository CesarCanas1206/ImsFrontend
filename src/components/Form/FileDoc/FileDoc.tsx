import ImageOrFile from '../../UI/ImageOrFile/ImageOrFile'
import { isEmpty } from '../../../utilities/strings'
import { Group } from '../../UI/Group/Group'
import Button from '../Button/Button'
import DateUI from '../Date/Date'
import FileUploader from '../FileUploader/FileUploader'
import Input from '../Input/Input'
import Checkbox from '../Checkbox/Checkbox'
import Stack from '../../UI/Stack/Stack'
import YesNo from '../YesNo/YesNo'

interface FileDocProps {
  readOnly?: boolean
  onChange?: any
  multiple?: boolean
  hasExpiry?: boolean
  value?: any
  prompt?: string
  allowReason?: boolean
  hasLicence?: boolean
}

export function FileDoc({
  readOnly,
  onChange,
  multiple,
  hasExpiry = false,
  value,
  prompt,
  allowReason,
  hasLicence,
}: FileDocProps) {
  const successHandler = ({ remove, ...file }: any) => {
    if (multiple) {
      if (remove) {
        onChange({
          value: [...value].filter((item: any) => item.value !== remove),
        })
        return
      }
      onChange({ value: [...value, ...(Array.isArray(file) ? file : [file])] })
      return
    }
    onChange({ value: !file?.value ? '' : file })
  }

  const currentFile = value

  const hasFile = !isEmpty(currentFile) && !isEmpty(currentFile?.value)

  if (readOnly) {
    return (
      <>
        {currentFile?.length !== 0 && (
          <ImageOrFile readOnly file={currentFile} />
        )}
      </>
    )
  }

  const showFile =
    typeof prompt !== 'string' || !isEmpty(currentFile?.promptShow)

  return (
    <Stack>
      {typeof prompt === 'string' && (
        <>
          {prompt}
          <YesNo
            value={currentFile?.promptShow}
            onChange={({ value }: any) =>
              onChange({
                value: { ...currentFile, promptShow: value },
              })
            }
          />
        </>
      )}
      {!hasFile && showFile && allowReason && (
        <>
          <Checkbox
            label="Don't have the document?"
            value={!isEmpty(currentFile?.hasReason)}
            onChange={({ value }: any) =>
              onChange({
                value: { ...currentFile, hasReason: value },
              })
            }
          />
          {!isEmpty(currentFile?.hasReason) && (
            <Input
              placeholder="Reason why not provided"
              value={currentFile?.reason}
              onChange={({ value }: any) =>
                onChange({
                  value: { ...currentFile, reason: value },
                })
              }
            />
          )}
        </>
      )}
      {showFile && isEmpty(currentFile?.hasReason) && (
        <div>
          <FileUploader defaultValue={currentFile} onSuccess={successHandler}>
            <Button text={'Upload file'} icon="File" />
          </FileUploader>
        </div>
      )}
      {hasFile && hasLicence && (
        <Group>
          Licence number:
          <DateUI
            value={currentFile?.licence}
            onChange={({ value }: any) =>
              onChange({
                name: '',
                value: { ...currentFile, licence: value },
              })
            }
          />
        </Group>
      )}
      {hasFile && hasExpiry && (
        <Group>
          Expiry date:
          <DateUI
            value={currentFile?.expiry}
            onChange={({ value }: any) =>
              onChange({ name: '', value: { ...currentFile, expiry: value } })
            }
          />
        </Group>
      )}
    </Stack>
  )
}

export default FileDoc
