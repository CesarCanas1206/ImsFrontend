import React, { useContext, useEffect, useState } from 'react'
import LoaderContent from '../../UI/LoaderContent/LoaderContent'
import useAPI from '../../../hooks/useAPI'
import FormContext from '../../../context/FormContext'
import Loader from '../../UI/Loader/Loader'

export function AssetList({ onChange, value, readOnly, ...props }: any) {
  const { values } = useContext(FormContext)
  const { get } = useAPI()
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState<any>([])

  useEffect(() => {
    if (
      !values.responses?.client_id ||
      // !values.responses?.site_id ||
      !values.responses?.form_id
    ) {
      return
    }
    console.log(values.responses?.client_id)
    console.log(values.responses?.site_id)
    console.log(values.responses?.form_id)
    const run = async () => {
      setLoading(true)
      const tmpFormQuestions = await get({
        endpoint: `form/${values.responses?.form_id}/question`,
      })
      const asset_type_id = [
        ...tmpFormQuestions
          .filter((question: any) => question.repeat === 1)
          .map((question: any) => question.props.asset_type_id ?? []),
      ]
      console.log(asset_type_id)
      const tmpAssets = await get({
        endpoint: `asset?group_id=${values.responses?.client_id}&asset_type_id=[${asset_type_id}]`,
      })
      setAssets(tmpAssets)
      setLoading(false)
    }
    run()
  }, [values, get])

  const checked = typeof value === 'string' ? value.split(',') : value

  const changeHandler = (id: string) => {
    if (onChange) {
      onChange(
        checked.includes(id)
          ? checked.filter((c: any) => c !== id)
          : [...checked, id],
      )
    }
  }

  if (loading) {
    return <LoaderContent justContent />
  }

  if (readOnly) {
    return (
      <>
        <strong>Assets for this job</strong>
        {assets.map((asset: any) => (
          <>
            <br />
            {asset.name}
          </>
        ))}
      </>
    )
  }

  return (
    <>
      <strong>Assets for this job</strong>
      {assets.map((asset: any) => (
        <>
          <br />
          <label>
            <input
              type="checkbox"
              checked={checked.includes(String(asset.id))}
              onChange={() => changeHandler(String(asset.id))}
            />{' '}
            {asset.name}
          </label>
        </>
      ))}
    </>
  )
}

export default AssetList
