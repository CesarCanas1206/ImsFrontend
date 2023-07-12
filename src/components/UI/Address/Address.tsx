import React from 'react'

interface IAddress {
  address?: string
  addressLine2?: string
  suburb?: string
  state?: string
  postcode?: string
}

function Address({ address, addressLine2, suburb, state, postcode }: IAddress) {
  const formatted = [
    [address, addressLine2, suburb]
      .filter((v: any) => v && v !== '')
      .join(', '),
    state,
    postcode,
  ].join(' ')

  return <>{formatted}</>
}

export default Address
