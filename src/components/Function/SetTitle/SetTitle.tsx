import React, { useContext, useEffect, useMemo } from 'react'
import PageContext from 'src/context/PageContext'
import useAssets from 'src/hooks/useAssets'
import useRegistryQuery from 'src/hooks/useRegistryQuery'

function SetTitle({ text, form_id, asset_id }: any) {
  const { registerAction, removeAction } = useContext(PageContext)

  const { data: forms } = useRegistryQuery({
    endpoint: 'form',
    options: {
      enabled: typeof form_id !== 'undefined',
    },
  })

  const { data: assets, isLoading } = useAssets({
    queryKey: ['setTitle'],
    options: {
      enabled: typeof asset_id !== 'undefined',
    },
  })

  if (typeof form_id !== 'undefined' || typeof asset_id !== 'undefined') {
    const form =
      typeof form_id !== 'undefined'
        ? forms?.find((form: any) => form.reference === form_id)
        : null
    let formName = form?.name ?? ''
    formName = !isLoading
      ? form?.category === 'checklist'
        ? `${formName} inspection at `
        : formName
      : ''

    const assetName =
      typeof asset_id !== 'undefined' && !isLoading
        ? assets?.filter((a: any) => a.id === asset_id).map((n: any) => n.label)
        : ''

    text = `${formName} ${assetName} ${text || ''}`.trim()
  }

  useEffect(() => {
    const action = {
      id: 'pageTitle',
      output: text,
    }
    registerAction(action)
    return () => {
      removeAction(action)
    }
  }, [text])

  return <></>
}

export default SetTitle
