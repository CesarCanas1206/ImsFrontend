import { useContext } from 'react'
import { useQuery } from 'react-query'
import { isEmpty } from 'src/utilities/strings'
import useAPI from './useAPI'
import FormContext from 'src/context/FormContext'
import { recursiveNameFromParentBuilder } from 'src/utilities/strings'

/**
 * formatAssetName
 * @param assets - array of assets for format
 * @param bookable optional, default true
 * @param asset_id optional, default '', filter by asset_id
 * @returns array
 */
const formatAssetName = (
  assets: any,
  bookable: boolean = true,
  asset_id: any = '',
) => {
  if (typeof assets === 'undefined') {
    return []
  }

  return (
    typeof assets !== 'undefined' &&
    typeof assets.map !== 'undefined' &&
    assets
      .map((asset: any) => {
        asset.label = asset.label
          ? asset.label
          : asset?.parent
          ? recursiveNameFromParentBuilder(asset)
          : asset.name
        asset.value = String(asset.id)
        return asset
      })
      .filter(
        (f: any) =>
          !bookable ||
          f.bookable === String(Number(bookable)) ||
          f.bookable === 'Yes',
      )
      .filter(
        (f: any) =>
          !asset_id ||
          (asset_id && (f.id === asset_id || f.parent_id === asset_id)),
      )
      .sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
  )
}

/**
 * formatHireAssetName
 * @param assets - array of assets for format
 * @param bookable optional, default true
 * @returns array
 */
const formatHireAssetName = (assets: any, bookable: boolean = true) => {
  if (typeof assets === 'undefined') {
    return []
  }
  //pull out the assets from the hire-asset results first, then loop
  return (
    typeof assets !== 'undefined' &&
    typeof assets.map !== 'undefined' &&
    assets
      // .map((asset: any) => {
      //   return asset.asset
      // })
      .map((asset: any) => {
        asset.label = asset.label
          ? asset.label
          : asset?.parent
          ? recursiveNameFromParentBuilder(asset)
          : asset.name
        asset.value = String(asset.id)
        return asset
      })
      .filter(
        (f: any) =>
          !bookable ||
          f.bookable === String(Number(bookable)) ||
          f.bookable === 'Yes',
      )
      .sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
  )
}

/**
 * useAssets
 * @param bookable optional, default false
 * @param queryKey optional, default ['assets', 'full']
 * @param options optional
 * @returns array
 */

function useAssets({
  bookable = false,
  hirerId = undefined,
  assetId = undefined,
  queryKey = ['assets', 'full', hirerId, assetId],
  options,
}: any) {
  const { get } = useAPI()
  const formContext = useContext(FormContext)

  const hirer_id = hirerId ?? formContext?.values?.hirer_id ?? undefined
  const asset_id = assetId ?? formContext?.values?.asset_id ?? undefined
  const showAll = formContext?.values?.assets === 'all' ?? false
  const loadAssets = async () => {
    // check hirer_id is defined
    if (typeof hirer_id !== 'undefined' && !showAll) {
      const assetList = await get({
        endpoint: `asset-bookable?hirer_id=${hirer_id}`,
      })
      return formatHireAssetName(assetList, bookable)
    } else {
      const param =
        typeof asset_id !== 'undefined' ? `?asset_id=${asset_id}` : ''
      const assetList = await get({
        endpoint: `asset${param}`,
      })
      return formatAssetName(assetList, bookable, asset_id)
    }
  }

  const data = useQuery<any>(queryKey ?? queryKey, loadAssets, {
    ...options,
  })

  return {
    data: data.data,
    isLoading: data.isLoading,
    refetch: data.refetch,
  }
}
export default useAssets
