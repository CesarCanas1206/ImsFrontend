import { useState, useEffect, useRef, useMemo } from 'react'
import { useQuery } from 'react-query'
import datasetRegistry from '../registry/datasetRegistry'
import useAPI from './useAPI'

const sumGroups = (
  data: { [key: string]: number }[],
): { [key: string]: number } => {
  const result: { [key: string]: number } = {}

  for (const item of data) {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = Number(item[key])
        if (!result[key]) {
          result[key] = value
        } else {
          result[key] += value
        }
      }
    }
  }

  return result
}

const datasetFormatter = ({ data, type }: any) => {
  if (type === 'sum') {
    return Object.values(sumGroups(data))
  }
  return data
}

function useDataset({ endpoint }: any) {
  const { get } = useAPI()

  const getData = useMemo(
    () =>
      async ({ endpoint }: any) => {
        const foundDataset = datasetRegistry.find(
          (data: any) => endpoint === data.slug, //endpoint.includes(data.slug),
        )

        if (foundDataset) {
          return {
            name: foundDataset.name,
            values: datasetFormatter({
              data: await get({ endpoint: foundDataset.data[0]?.endpoint }),
              type: foundDataset.data[0]?.type ?? '',
            }),
            labels: foundDataset.data[0]?.labels,
          }
        }
        return await get({ endpoint })
      },
    [endpoint],
  )

  return useQuery(['dataset', endpoint], async () => getData({ endpoint }), {
    staleTime: 60 * 1000,
  })
}

export default useDataset
