import { runFilter } from 'src/components/UI/DataGrid/runFilter'
import useAPI from '../hooks/useAPI'
import { useQuery } from 'react-query'

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

function useDataGridQuery({ endpoint, setFilteredData, filters }: any) {
  const { get } = useAPI()

  return useQuery(
    ['datagrid', endpoint],
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
            .map((item: any) => ({ ...item, registry: endpoint })),
          ...results,
        ].sort((a: any, b: any) => a.name.localeCompare(b.name))
      }

      setFilteredData(runFilter(results, filters))

      return results
    },
    {
      staleTime: 3 * 1000,
    },
  )
}

export default useDataGridQuery
