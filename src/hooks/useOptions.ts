import useAPI from './useAPI'

function useOptions() {
  const { get } = useAPI()

  const getData = async ({ endpoint, value_key }: any) => {
    const results = await get({ endpoint })
    return typeof results.map !== 'undefined'
      ? results.map((item: any) => ({
          label: item?.name ?? item.label,
          value: typeof value_key !== 'undefined' ? item[value_key] : item.id,
        }))
      : []
  }

  return getData
}

export default useOptions
