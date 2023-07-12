import { useContext } from 'react'
import { useQuery } from 'react-query'
import AppContext from '../../../context/AppContext'
import useAPI from '../../../hooks/useAPI'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'

export const settings = [
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
    default: '',
  },
]

interface IDetails {
  endpoint: string
  children: any
}

export function Details({ endpoint, children }: IDetails) {
  const { get } = useAPI()
  const { setDetails } = useContext(AppContext)

  const loadDetails = async () => {
    const getDetails = await get({
      endpoint,
    })

    if (typeof getDetails === 'object') {
      setDetails({ ...getDetails, endpoint })
    }
  }

  const { isLoading } = useQuery(['details', endpoint], loadDetails)

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      {children}
    </>
  )
}

export default Details
