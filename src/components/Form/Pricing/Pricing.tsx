import { useState, useMemo, useContext } from 'react'
import usePricing from '../../../hooks/usePricing'
import FormContext from '../../../context/FormContext'
import InputPrice from '../InputPrice/InputPrice'
import Group from '../../UI/Group/Group'
import FormatDate from '../../Function/FormatDate/FormatDate'
import { Table } from '@mantine/core'
import Badge from '../../UI/Badge/Badge'

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000
  diff /= 60 * 60
  return Math.abs(+diff.toFixed(2))
  // return Math.abs(Math.round(diff))
}

function Pricing({ bookingCategory, customerType, onChange, value, row }: any) {
  const [pricing, setPricing] = useState<any>([])

  const { getPricing } = usePricing()
  const formContext = useContext(FormContext)

  const bookingForm =
    formContext !== null && typeof formContext.values !== 'undefined'
      ? formContext.values
      : row

  useMemo(() => {
    const run = async () => {
      const tmpPricing = await getPricing({
        assetId: bookingForm.asset_id,
        customerType: '072b29ec-35d3-4324-a306-f229d2aafea5',
        bookingCategory: '12a90966-a77a-4e4e-96e2-11d6f8eeb773',
      })
      setPricing(tmpPricing)
    }
    run()
  }, [bookingForm.start, bookingForm.end])

  // console.log(pricing)
  let total = 0
  const rows = pricing.map((item: any, idx: number) => {
    const unit = item?.unit ?? 'hour'
    const unitRate = unit === 'hour' ? ' PH' : ' FX'
    const price = item?.price ?? 0
    const hours =
      typeof bookingForm.end !== 'undefined' &&
      typeof bookingForm.start !== 'undefined'
        ? diffHours(new Date(bookingForm.end), new Date(bookingForm.start))
        : 0
    const totalRate =
      unit === 'hour'
        ? (hours * Number(price)).toFixed(2)
        : Number(price).toFixed(2)
    total += Number(totalRate) ?? 0

    return (
      <tr key={idx}>
        <td>
          {unit === 'fixed' && item.name}
          {unit !== 'fixed' && (
            <>
              <FormatDate
                date={bookingForm.start}
                format={'D MMM YYYY h:mmA'}
              />
              {' - '}
              <FormatDate date={bookingForm.end} format={'D MMM YYYY h:mmA'} />
              <br />
              <Badge>{item.name}</Badge>
            </>
          )}
        </td>
        <td style={{ textAlign: 'end' }}>
          <Group spacing={0}>
            <InputPrice readOnly={true} value={price.toString()}></InputPrice>
            {unitRate}
          </Group>
        </td>
        <td style={{ textAlign: 'end' }}>
          <InputPrice readOnly={true} value={totalRate.toString()}></InputPrice>
        </td>
      </tr>
    )
  })

  return (
    <Table>
      <tbody>
        {rows}
        <tr>
          <td colSpan={2} style={{ textAlign: 'end' }}>
            Total
          </td>
          <td style={{ textAlign: 'end' }}>
            <InputPrice readOnly={true} value={total.toString()}></InputPrice>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Pricing
