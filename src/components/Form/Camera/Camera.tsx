import SimpleGrid from 'src/components/UI/SimpleGrid/SimpleGrid'
import Image from '../../UI/Image/Image'
import Button from '../Button/Button'
import FileUploader from '../FileUploader/FileUploader'

export function Camera({ readOnly, onChange, multiple, value, ...props }: any) {
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
    onChange({ value: file })
  }

  if (readOnly) {
    return (
      <>
        {value?.length !== 0 && (
          <SimpleGrid>
            <Image src={value} gallery style={{ maxWidth: 300 }} />
          </SimpleGrid>
        )}
      </>
    )
  }

  return (
    <FileUploader defaultValue={value} onSuccess={successHandler}>
      <Button text={'Take photo'} icon={'Camera'} />
    </FileUploader>
  )
}

export default Camera
