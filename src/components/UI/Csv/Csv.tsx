import React, { useContext, useRef, useState, Children, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import DataGridContext from '../../../context/DataGridContext'
import { textReplace } from '../../DynamicComponent/textReplace'

export const settings = [
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
    default: '',
  },
]

interface ICsv {
  endpoint: string
  children?: any
  columns?: any
}

export function Csv({ endpoint, columns: sentColumns, children }: ICsv) {
  const { columns, filteredData } = useContext(DataGridContext)
  const ref = useRef<any>()
  const [headings, setHeadings] = useState<any>([])
  const [data, setData] = useState<any>([])
  const [download, setDownload] = useState(false)

  const filename = 'csvdownload.csv'

  const downloadHandler = async () => {
    const cols = (sentColumns ?? columns)
      ?.filter((col: any) => !col?.reference?.includes('action'))
      ?.map((col: any) => ({
        key: col.reference ?? col.key ?? '',
        label: col.name ?? '',
      }))
    setHeadings(cols)

    const formattedData = [...filteredData].map((row: any) => {
      cols.forEach((col: any) => {
        row[col.key] = textReplace({ value: col.key }, row, true)?.value
      })
      return row
    })

    setData(formattedData)
    setDownload(true)
  }

  useEffect(() => {
    if (download) {
      setDownload(false)
      ref.current.link.click()
    }
  }, [download])

  return (
    <>
      {Children.count(children) !== 0 ? (
        Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: downloadHandler,
            disabled:
              typeof filteredData === 'undefined' || filteredData?.length === 0,
          }),
        )
      ) : (
        <button onClick={downloadHandler} className="btn btn-primary">
          Download CSV
        </button>
      )}
      <CSVLink
        data={data}
        ref={ref}
        filename={filename}
        headers={headings}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default Csv
