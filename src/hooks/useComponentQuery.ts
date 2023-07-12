import { useQuery } from 'react-query'
import { get } from './useAPI'

const loadSub = (comp: any, pageComponents: any) => ({
  ...comp,
  sub: [
    ...(comp.sub || []),
    ...pageComponents
      ?.filter(
        ({ parent_id }: any) =>
          typeof parent_id !== 'undefined' && comp.id && parent_id === comp.id,
      )
      .map((item: any) => loadSub(item, pageComponents)),
  ],
})

function useComponentQuery(
  pageId: string | undefined,
  components?: object[] | undefined,
  local?: boolean,
) {
  const { data, refetch } = useQuery({
    queryKey: ['components', pageId],
    queryFn: () => get({ endpoint: `page/${pageId}/components` }),
    placeholderData: components,
    staleTime: 1000 * 60 * 20,
    enabled: typeof pageId !== 'undefined' && !local,
  })

  const comps = data ?? components ?? []

  return {
    data: comps.map((comp: any) => loadSub(comp, comps)),
    refetch,
  }
}

export default useComponentQuery
