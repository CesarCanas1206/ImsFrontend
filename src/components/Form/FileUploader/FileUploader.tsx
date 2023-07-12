import React, { useEffect, useState, Children, useRef } from 'react'
import { Icon } from '../../UI/Icon/Icon'
import ImageOrFile from '../../UI/ImageOrFile/ImageOrFile'
import useAPI from '../../../hooks/useAPI'
import Space from '../../UI/Space/Space'
import { showNotification, updateNotification } from '@mantine/notifications'
import { isEmpty } from '../../../utilities/strings'
import SimpleGrid from 'src/components/UI/SimpleGrid/SimpleGrid'

export function FileUploader({
  children,
  onSuccess,
  readOnly,
  withPreview = true,
  ...initial
}: any) {
  const { defaultValue } = initial
  const [previewFile, setPreviewFile] = useState<any[]>([])
  const fileRef = useRef<any>()
  const { upload } = useAPI()

  const selectFile = (files: any) => {
    Object.values(files).forEach((file: any) => {
      const reader: any = new FileReader()
      reader.onload = async function () {
        showNotification({
          id: 'upload-file',
          loading: true,
          title: 'Uploading file',
          message: 'Please wait...',
          autoClose: false,
          withCloseButton: false,
        })

        const uploaded = await upload({
          endpoint: 'upload-file',
          data: [{ name: 'file', value: file }],
        })
        if (typeof onSuccess !== 'undefined') {
          onSuccess({
            name: uploaded.name,
            value: uploaded.path,
            fileType: file.type,
          })
        }

        updateNotification({
          id: 'upload-file',
          color: 'teal',
          title: 'Uploaded file!',
          message: 'The file has now been uploaded!',
          icon: <Icon type="tick" />,
          autoClose: 2000,
        })

        const imageType = /image.*/
        if (file.type.match(imageType)) {
          setPreviewFile((preview: any[]) => [...preview, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    if (isEmpty(defaultValue) || defaultValue === '[]') {
      setPreviewFile([])
      return
    }
    setPreviewFile(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
  }, [defaultValue])

  const clickHandler = () => {
    fileRef.current.click()
  }

  if (readOnly) {
    return (
      <>
        {previewFile.length === 0 && <strong>No file has been uploaded</strong>}
        {previewFile.length !== 0 &&
          previewFile.map((preview) => (
            <ImageOrFile key={preview?.value || preview} file={preview} />
          ))}
      </>
    )
  }

  const Wrapper = withPreview && previewFile.length > 1 ? SimpleGrid : 'div'

  return (
    <>
      {Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          onClick: clickHandler,
        })
      })}
      <input
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '-9999px',
        }}
        ref={fileRef}
        onChange={(e: any) => selectFile(e.target.files)}
        type="file"
        multiple
      />
      <Space h="sm" />
      {withPreview && previewFile.length !== 0 && (
        <Wrapper>
          {previewFile.map((preview) => (
            <ImageOrFile
              key={preview?.value || preview}
              file={preview}
              onChange={onSuccess}
            />
          ))}
        </Wrapper>
      )}
    </>
  )
}

export default FileUploader
