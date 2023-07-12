import useAPI from './useAPI'

function usePricing() {
  const { get } = useAPI()

  const getPricing = async ({
    asset: sentAsset,
    assetId,
    customerType,
    bookingCategory,
  }: any) => {
    if (!assetId) return []
    const asset = sentAsset ?? (await get({ endpoint: `d/asset/${assetId}` }))

    const pricing = (asset?.pricing || asset['asset-type']?.pricing) ?? []

    return pricing?.map((item: any) => {
      const rates = item.rates[`${bookingCategory}.${customerType}`] ?? {}
      if (rates !== '{}') {
        rates['name'] = item.name ?? ''
      }
      return rates
    })
  }

  return {
    getPricing,
  }
}

export default usePricing
