import Confirm from '../../Function/Confirm/Confirm'
import Image from '../Image/Image'
import { Icon } from '../Icon/Icon'

function ImageOrFile({ file, onChange, readOnly }: any) {
  const name = file?.name ?? 'Unnamed'
  file = file?.value ?? file

  const hasFile =
    typeof file !== 'undefined' && typeof file === 'string' && file !== ''

  const isImage =
    hasFile &&
    ['jpg', 'jpeg', 'png'].includes(
      String(file)?.split('.').pop()?.toLowerCase()!,
    )

  const size = 200

  const sizing = hasFile && file.includes('?') ? `&h=${size}` : `?h=${size}`

  return (
    <>
      {hasFile && (
        <div
          style={{
            backgroundColor: 'rgba(120,120,120,.1)',
            borderRadius: 4,
            position: 'relative',
            padding: 4,
          }}
        >
          {isImage && (
            <Image
              key={file}
              src={file + sizing}
              alt=""
              height={size}
              gallery
              fit="contain"
            />
          )}
          {!isImage && (
            <a
              href={file}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                wordBreak: 'break-all',
              }}
            >
              <Icon type="pdf" /> {name}
            </a>
          )}
          {!readOnly && (
            <Confirm
              style={
                isImage
                  ? { position: 'absolute', bottom: 10, right: 10 }
                  : { marginTop: 4 }
              }
              onYes={() => onChange({ remove: file, value: '' })}
              variant="danger"
              title="Are you sure you want to delete this file?"
              icon="delete"
              tooltip="Delete file"
              compact
            />
          )}
        </div>
      )}
    </>
  )
}

export default ImageOrFile
