import React, { useRef, useState } from 'react'
import Loader from '../../UI/Loader/Loader'
import useAPI from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'

function AmottoAuditPhotos({ row }: any) {
  const id = row.id ?? null
  const { get, post } = useAPI()
  const [status, setStatus] = useState<string | null>(null)
  const [building, setBuilding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadHandler = async () => {
    setBuilding(true)
    setStatus('Checking photos')
    const data = await get({
      endpoint: 'd/pool-audit/' + id + '?with=audit,section,element',
    })
    const audit = data

    let allPhotos: any = {}
    ;(audit.section ?? []).forEach((section: any) => {
      const elements = section.element?.filter(
        (element: any) =>
          typeof element.photo_1 !== 'undefined' ||
          typeof element.photo_2 !== 'undefined' ||
          typeof element.photo_3 !== 'undefined' ||
          typeof element.photo_4 !== 'undefined',
      )

      if (!elements || elements.length === 0) {
        return
      }

      elements.forEach((element: any) => {
        ;[
          element.photo_1,
          element.photo_2,
          element.photo_3,
          element.photo_4,
        ].forEach((photo: any) => {
          if (typeof photo === 'undefined' || !photo || photo.name === '') {
            return
          }
          allPhotos[photo.name] = photo?.value
        })
      })
    })

    if (Object.values(allPhotos).length === 0) {
      setBuilding(false)
      setStatus(null)
      setError('No photos in audit')
      setTimeout(() => setError(null), 5000)
      return
    }

    setStatus('Building .zip')

    const blob = await post({
      endpoint: 'function/zipImages',
      getBlob: true,
      data: {
        photos: Object.values(allPhotos).filter((photo: any) => photo),
      },
    })

    setTimeout(() => setStatus(null), 1000)

    const href = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', 'photos.zip')
    ref.current.appendChild(link)
    link.click()
    ref.current.removeChild(link)
    setBuilding(false)
  }

  const ref = useRef<HTMLElement>(null)

  return (
    <>
      <Button
        icon={error !== null ? 'warning' : 'images'}
        onClick={downloadHandler}
        tooltip="Download zip of all photos in the audit"
        text={
          <>
            {building && (
              <Loader
                size="1.5rem"
                style={{
                  borderTopColor: '#fff',
                  borderLeftColor: '#fff',
                  borderRightColor: '#fff',
                  marginRight: 5,
                }}
              />
            )}
            {error ?? status ?? 'Download photos'}
          </>
        }
      />
      <span ref={ref} style={{ position: 'absolute' }}></span>
    </>
  )
}

export default AmottoAuditPhotos
