import { useQuery } from 'react-query'
import useAPI from './useAPI'

const registries: any = {
  dataset: () => import('../registry/datasetRegistry'),
  permission: () => import('../registry/permissionRegistry'),
  email: () => import('../registry/emailRegistry'),
  'd/email-template': () => import('../registry/emailRegistry'),
  form: () => import('../registry/formRegistry'),
  page: () => import('../registry/pageRegistry'),
  module: () => import('../registry/moduleRegistry'),
  workflow: () => import('../registry/workflowRegistry'),
}

/**
 *
 * @param endpoint - get the registries by endpoint
 * @param category - filter by category
 * @returns
 */
function useRegistryQuery({
  endpoint,
  category,
  queryKey = ['dataset', endpoint, category],
  options,
}: any) {
  const { get } = useAPI()

  return useQuery(
    queryKey,
    async () => {
      let results = await get({ endpoint })
      if (!Array.isArray(results)) {
        results = [results]
      }
      if (typeof registries[endpoint] !== 'undefined') {
        const registry = await registries[endpoint]().then(
          (mod: any) => mod.default,
        )

        const ids = results.map((item: any) => item.id)
        results = [
          ...registry
            .filter((item: any) => !ids.includes(item.id))
            .filter(
              (item: any) =>
                (typeof category !== 'undefined' &&
                  item?.category === category) ||
                typeof category === 'undefined',
            )
            .map((item: any) => ({ ...item, registry: endpoint })),
          ...results.filter(
            (item: any) =>
              (typeof category !== 'undefined' &&
                item?.category === category) ||
              typeof category === 'undefined',
          ),
        ].sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
      }

      return results
    },
    {
      ...options,
      staleTime: 10 * 1000,
    },
  )
}

export default useRegistryQuery
