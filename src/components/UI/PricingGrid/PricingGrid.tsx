import React, { useContext, useState } from 'react'
import FormContext from '../../../context/FormContext'
import useAPI from '../../../hooks/useAPI'
import Skeleton from '../Skeleton/Skeleton'
import Input from '../../Form/Input/Input'
import Select from '../../Form/Select/Select'
import Group from '../Group/Group'
import { Grid, Table } from '@mantine/core'
import Card from '../Card/Card'
import Heading from '../Heading/Heading'
import { useQuery } from 'react-query'
import InputPrice from '../../Form/InputPrice/InputPrice'

function LoadingSkeleton() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
        }}
      >
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
        }}
      >
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={200} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
        <Skeleton width={90} height={40} mx={15} />
      </div>
    </>
  )
}

const yearQuery = {
  data: [
    { label: '2019 / 2020', value: '20192020' },
    { label: '2020 / 2021', value: '20202021' },
    { label: '2021 / 2022', value: '20212022' },
    { label: '2022 / 2023', value: '20222023' },
  ],
}

const feeTypeQuery = {
  data: [
    { label: 'Park / beach fees', value: '1' },
    { label: 'Facility fees', value: '3' },
    { label: 'Court fees', value: '4' },
    { label: 'Commercial operator fees', value: '5' },
    { label: 'Non-commercial sporting fees', value: '6' },
    { label: 'Bonds', value: '7' },
    { label: 'Other fees', value: '8' },
  ],
}

function PricingFilters({ feeTypeQuery, yearQuery, filters, setFilters }: any) {
  const changeHandler = ({ name, value }: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <Group position="apart">
          <Heading size="h5">Filters</Heading>
        </Group>
        <Grid style={{ marginBottom: 10 }}>
          <Grid.Col span={3}>Percentage increase</Grid.Col>
          <Grid.Col span={9}>
            <Group>
              <Input
                value={filters?.percent}
                onChange={({ value }: any) =>
                  changeHandler({ name: 'percent', value })
                }
                style={{ maxWidth: 60 }}
              />
              %
            </Group>
          </Grid.Col>
        </Grid>
        <Grid style={{ marginBottom: 10 }}>
          <Grid.Col span={3}>Year</Grid.Col>
          <Grid.Col span={2}>
            <Select
              placeholder={''}
              value={filters?.year}
              data={yearQuery.data}
              onChange={({ value }: any) =>
                changeHandler({ name: 'year', value })
              }
              style={{ width: 120 }}
            />
          </Grid.Col>
          {/* <Grid.Col span={2}>Fee type</Grid.Col>
          <Grid.Col span={5}>
            {' '}
            <Select
              placeholder={''}
              value={filters?.feeType}
              data={feeTypeQuery.data}
              onChange={({ value }: any) =>
                changeHandler({ name: 'feeType', value })
              }
              style={{ maxWidth: 200 }}
            />
          </Grid.Col> */}
        </Grid>
        <Grid style={{ marginBottom: 10 }}>
          <Grid.Col span={3}>Current fees and charges weblink</Grid.Col>
          <Grid.Col span={9}>
            {' '}
            <Input
              value={filters?.weblink}
              onChange={({ value }: any) =>
                changeHandler({ name: 'weblink', value })
              }
              style={{ maxWidth: '100%' }}
            />
          </Grid.Col>
        </Grid>
      </Card>
    </>
  )
}

export default function PricingGrid({
  onChange,
  showFilters,
  itemId,
  readOnly,
  row,
}: any) {
  const { get, put } = useAPI()
  const [filters, setFilters] = useState({
    percent: '3',
    year: '20222023',
    feeType: '',
    weblink: '',
  })
  const [pricingType, setPricingType] = useState<any>()
  const formContext = useContext(FormContext)

  const bookingCategory = useQuery(
    ['booking-category'],
    async () => await get({ endpoint: 'd/customer-type?sort_by=name' }),
  )

  const customerType = [
    {
      id: 'rate',
      name: 'Rate',
    },
    {
      id: 'bond',
      name: 'Bond',
    },
    {
      id: 'booking-fee',
      name: 'Booking fee',
    },
  ]

  // const customerType = useQuery(
  //   ['customer-type'],
  //   async () => await get({ endpoint: 'd/customer-type?sort_by=name' }),
  // )

  const pricing = formContext !== null ? formContext.values : row

  if (bookingCategory.isLoading) {
    return <LoadingSkeleton />
  }

  const rates = pricingType ?? pricing?.rates ?? {}
  const colwidth = `${(85 / customerType.length).toFixed(2)}px`

  const changeHandler = (newValue: any, key: string) => {
    const newValues = {
      ...rates,
      [key]: {
        price: newValue,
        unit: rates[key]?.unit ?? 'hour',
      },
    }
    setPricingType(newValues)
    if (typeof onChange !== 'undefined') {
      onChange({ value: newValues, ref: 'rates' })
      return
    }

    put({
      endpoint: `d/pricing/${itemId}`,
      data: {
        rates: newValues,
      },
    })
  }

  const changeUnitHandler = (newValue: any, key: string) => {
    const newValues = {
      ...rates,
      [key]: {
        price: rates[key]?.price ?? rates[key] ?? '0',
        unit: newValue,
      },
    }
    setPricingType(newValues)
    if (typeof onChange !== 'undefined') {
      onChange({ value: newValues, ref: 'rates' })
      return
    }

    put({
      endpoint: `d/pricing/${itemId}`,
      data: {
        rates: newValues,
      },
    })
  }

  /*
  prcing - match pricing, then fine price and unit and calculate
  const {getPricing, checkPricing} = usePricing()
  getPricing({
    assetId,
    bookingId,
    hirerId,
    hours,
  })

  key, splits('.'), get types

  {
    price: 41,
    name: 'Casual:Non commercial,
    unit: 'hour',
  }
  */

  return (
    <>
      {showFilters && (
        <PricingFilters
          feeTypeQuery={feeTypeQuery}
          yearQuery={yearQuery}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <Card key={pricing.id} style={{ width: '100%' }}>
        {/* {pricing.name && (
              <Group position="apart">
                <Heading size="h5">{pricing.name}</Heading>
              </Group>
            )} */}
        <Table>
          <thead>
            <tr>
              <th style={{ padding: '7px 8px', width: '15%' }}></th>
              {customerType.map((customerItem: any, idx: number) => (
                <th
                  key={customerItem.name}
                  style={{
                    padding: '7px 0',
                    width: colwidth,
                    textAlign: !readOnly ? 'center' : 'left',
                  }}
                >
                  {customerItem.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookingCategory.data.map((cat: any) => {
              return (
                <tr key={cat.name}>
                  <td style={{ fontWeight: 'bold' }}>{cat.name}</td>
                  {customerType.map((customerItem: any, idx: number) => (
                    <td
                      key={customerItem.name}
                      style={{
                        padding: '7px 0',
                        width: colwidth,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Group spacing="0">
                        <InputPrice
                          readOnly={readOnly}
                          value={
                            typeof rates !== 'undefined'
                              ? rates[`${cat.id}.${customerItem.id}`]?.price ??
                                rates[`${cat.id}.${customerItem.id}`] ??
                                '0'
                              : '0'
                          }
                          onChange={({ value }: any) =>
                            changeHandler(value, `${cat.id}.${customerItem.id}`)
                          }
                          style={{ maxWidth: 70 }}
                        />
                        {/* <Select
                          readOnly={readOnly}
                          aria-label="Rate type"
                          onChange={({ value }: any) =>
                            changeUnitHandler(
                              value,
                              `${cat.id}.${customerItem.id}`,
                            )
                          }
                          value={
                            typeof rates !== 'undefined'
                              ? rates[`${cat.id}.${customerItem.id}`]?.unit ??
                                'hour'
                              : 'hour'
                          }
                          required={true}
                          readOnlyBrackets={true}
                          data={[
                            { label: 'Hourly', value: 'hour' },
                            { label: 'Fixed', value: 'fixed' },
                          ]}
                          style={{ width: '90px' }}
                        /> */}
                      </Group>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card>
    </>
  )
}
