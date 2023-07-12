import { Table } from '@mantine/core'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import FormatDate from '../../Function/FormatDate/FormatDate'
import useAPI from '../../../hooks/useAPI'
import usePricing from '../../../hooks/usePricing'

function Invoice({ itemId }: any) {
  const { getPricing } = usePricing()

  useMemo(() => {
    const run = async () => {
      console.log(
        await getPricing({
          assetId: 'asset1',
          customerType: '12a90966-a77a-4e4e-96e2-11d6f8eeb773',
          bookingType: '836b111f-cf09-48ff-b296-6d36c2b677f9',
        }),
      )
    }
    run()
  }, [])

  const { get } = useAPI()
  const { isLoading, data: invoice } = useQuery(
    ['invoice', itemId],
    async () => await get({ endpoint: `d/invoice/${itemId}` }),
    {
      staleTime: 2,
    },
  )

  if (isLoading) {
    return <>Loading</>
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: '5px 15px',
        borderRadius: 4,
      }}
    >
      <h3>Invoice #{invoice.number}</h3>
      <h5>
        Issued: <FormatDate date={invoice.date} />
      </h5>
      <h5>
        Due: <FormatDate date={invoice.date} />
      </h5>
      <hr />
      Bill to:
      <br />
      <p>Bob Smith</p>
      <p>123 fake street</p>
      <p>Fakeland</p>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th align="center">Qty/Hours</th>
            <th align="right">Price</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {typeof invoice.items !== 'undefined' &&
            invoice.items.map((item: any) => (
              <tr key={item.desc + item.price + item.qty}>
                <td>{item.desc}</td>
                <td align="center">{item.qty}</td>
                <td align="right">${item.price}</td>
                <td align="right">${Number(item.qty) * Number(item.price)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} align="right">
              <h6>Total: ${invoice.total}</h6>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

export default Invoice
