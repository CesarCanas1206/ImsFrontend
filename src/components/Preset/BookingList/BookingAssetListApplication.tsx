import React, { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Button from 'src/components/Form/Button/Button'
import QuestionSimple from 'src/components/Form/Question/QuestionSimple'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'
import DataGrid from 'src/components/UI/DataGrid/DataGrid'
import Group from 'src/components/UI/Group/Group'
import ItemStatus from 'src/components/UI/ItemStatus/ItemStatus'
import Stack from 'src/components/UI/Stack/Stack'
import { get, put, post } from 'src/hooks/useAPI'
import { formatDate, formatTime } from 'src/utilities/dates'
import { isEmpty, nl2brstr, toTableHTML } from 'src/utilities/strings'
import BookingAssetListUsage from './BookingAssetListUsage'
import ModalButton from 'src/components/UI/ModalButton/ModalButton'
import AppContext from 'src/context/AppContext'
import { uuid } from '../../../utilities/strings'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'

let questionSavingQueue: any = []

function BookingAssetListApplication({ asset }: any) {
  const { siteName } = useContext(AppContext)

  const params = useParams()
  let navigate = useNavigate()

  const id = uuid()

  const [data, setData] = useState<any>({})
  const [hirer, setHirer] = useState<any>({})
  const [assetQuestions, setAssetQuestions] = useState<any>([])

  const usageQuery = useQuery(
    'usage',
    async () => {
      const results: any = []
      // await post({
      //   endpoint: 'usage',
      //   data: {
      //     parent_id: id,
      //     withParent: true,
      //   },
      // })

      const ids = results.map((item: any) => item.asset_id)
      const getQuestions = await get({
        endpoint:
          'd/asset-question?asset_id=[' +
          ids.join(',') +
          '&sort=question_order',
      })

      let questions: any = {}
      getQuestions.map((q: any) => {
        if (typeof questions[q.asset_id] === 'undefined') {
          questions[q.asset_id] = []
          questions[q.asset_id].push({
            component: 'FormHeading',
            props: { text: q?.asset?.[0]?.name },
          })
        }

        questions[q.asset_id].push({
          label: q.label ?? q.text,
          component: q.component ?? q.type ?? 'Input',
          reference: q.reference ?? '',
          question_order: q.question_order ?? 0,
          props: q.props ?? {},
        })
      })

      setAssetQuestions(Object.values(questions).flat())

      return results
    },
    { enabled: typeof id !== 'undefined' },
  )

  const ref = useRef(0)

  useEffect(() => {
    if (ref.current) {
      return
    }
    ref.current = 1
    setData({ id: id })
  }, [])

  const changeHandler = ({ type, value, reference }: any) => {
    const key = `${siteName}-bookings`
    let localData = JSON.parse(localStorage.getItem(key) || '[]')
    localData.push({ ...data, [reference]: value })
    localStorage.setItem(key, JSON.stringify(localData))

    let id = data.id
    let endpoint = `booking/${id}`
    if (type === 'hirer') {
      //   setHirer((prev: any) => ({ ...prev, [reference]: value }))
      //   id = hirer.id
      //   endpoint = 'hirer/' + id
      // } else if (type === 'user') {
      //   setHirer((prev: any) => ({
      //     ...prev,
      //     user: { ...prev.user, [reference]: value },
      //   }))
      //   id = hirer?.user?.id
      //   endpoint = `user/${id}`
    } else {
      setData((prev: any) => ({ ...prev, [reference]: value }))
    }

    // if (questionSavingQueue[reference]) {
    //   clearTimeout(questionSavingQueue[reference])
    // }
    // questionSavingQueue[reference] = setTimeout(() => {
    //   put({
    //     endpoint,
    //     data: { [reference]: value },
    //   })
    // }, 800)
  }

  const completeHandler = async () => {
    if (usageQuery.data?.length === 0) {
      console.log('Usage not added')
      return
    }
    changeHandler({ reference: 'completed', value: 'Yes' })
    await Promise.all([
      sendEmail({
        template: 'booking_completion',
        data: {
          role: '1',
        },
        replace: {
          details: nl2brstr(
            toTableHTML([
              ['Application Id', '{application_id}'],
              ['Hirer', hirer?.name],
              ['Activities to be conducted', '{activity}'],
              ['Prime use relating to activity', '{prime_use}'],
              ['Access to toilets requested', '{public_toilets}'],
              ['Name of event to be conducted', '{name}'],
              ['Booking notes', '{comments}'],
            ]) +
              '<br /><br />' +
              usageQuery.data
                .map((item: any) =>
                  toTableHTML([
                    [
                      'Venue',
                      item.asset?.parent?.name + ' - ' + item.asset?.name,
                    ],
                    ['Booking date', formatDate(item.date)],
                    [
                      'Booking time',
                      formatTime(item.start) + ' - ' + formatTime(item.end),
                    ],
                    ['Activity', item.title],
                  ]),
                )
                .join('<br /><br />'),
          ),
        },
        row: data,
      }),
      get({ endpoint: `buildCalendarUsage/${id}?pending` }),
    ])
    navigate(-1)
  }

  const isCompleted = data?.completed === 'Yes'
  const defaultComponent = !isCompleted ? 'Input' : 'ReadOnly'

  const fields = [
    {
      component: 'FormHeading',
      props: { text: 'Booking application summary' },
    },
    // {
    //   label: 'Application Id',
    //   reference: 'application_id',
    //   component: 'ReadOnly',
    //   props: { text: data.application_id },
    // },
    {
      label: 'Status',
      component: 'Fragment',
      props: { sub: [<ItemStatus prefix="" row={data} />] },
    },
    // {
    //   label: 'Name of Hirer / Group / Individual',
    //   reference: 'name',
    //   component: 'ReadOnly',
    //   type: 'hirer',
    //   props: { value: hirer.name },
    // },
    // {
    //   label: 'Hirer contact',
    //   reference: 'name',
    //   type: 'user',
    //   props: { value: hirer?.user?.name },
    // },
    // {
    //   label: 'Hirer contact phone',
    //   reference: 'phone',
    //   type: 'user',
    //   props: { value: hirer?.user?.phone },
    // },
    // {
    //   label: 'Hirer contact email',
    //   reference: 'email',
    //   type: 'user',
    //   props: { value: hirer?.user?.email },
    // },
    // {
    //   label: 'Account number',
    //   reference: 'account_no',
    //   type: 'hirer',
    //   props: { value: hirer?.account_no },
    // },
    {
      label: 'PLI',
      reference: 'public_liability',
      type: 'hirer',
      component: 'FileDoc',
      props: { hasExpiry: true, value: hirer?.public_liability },
    },
    {
      component: 'FormHeading',
      props: { text: 'Booking summary' },
    },
    {
      label: 'Type of event to be conducted',
      reference: 'type',
      component: 'Select',
      props: {
        options: [
          {
            label: 'Casual',
            value: 'casual',
          },
          {
            label: 'Regular',
            value: 'regular',
          },
          {
            label: 'Function',
            value: 'function',
          },
        ],
      },
    },
    {
      label: 'Name of event to be conducted',
      reference: 'name',
    },
    {
      label: 'Activities to be conducted',
      reference: 'activity',
    },
    {
      label: 'Prime use relating to activity',
      reference: 'prime_use',
    },
    {
      label: 'Items to be taken onto sportsground/reserve',
      reference: 'items',
    },
    {
      label: 'Access to toilets requested',
      reference: 'public_toilets',
      props: { value: data?.public_toilets ?? false },
      component: isCompleted ? 'ReadOnly' : 'Switch',
    },
    data?.type === 'casual'
      ? { label: 'Casual question', reference: 'casual' }
      : {},
    data?.type === 'regular'
      ? { label: 'Regular question', reference: 'regular' }
      : {},
    data?.type === 'function'
      ? { label: 'Function question', reference: 'regular' }
      : {},
    {
      label: 'Booking notes',
      reference: 'comments',
      component: isCompleted ? 'ReadOnly' : 'Textarea',
    },
    {
      component: 'FormHeading',
      props: { text: 'Booking details' },
    },
    {
      component: 'Fragment',
      props: {
        sub: [
          <DataGrid
            key={usageQuery.isFetching + ''}
            queryOverride={{
              data: usageQuery.data,
              isLoading: usageQuery.isLoading,
              isSuccess: usageQuery.isSuccess,
              refetch: () => {
                usageQuery.refetch()
                console.log('Refetching!!')
              },
            }}
            position="bottom"
            sorting={[
              { name: 'Added (oldest)', key: 'created_at' },
              {
                name: 'Added (latest)',
                key: 'created_at,desc|day',
                default: true,
              },
              { name: 'Venue (A-Z)', key: 'asset.parent|asset.name' },
              { name: 'Venue (Z-A)', key: 'asset.parent,desc|asset.name,desc' },
            ]}
            columns={[
              { name: 'Venue', key: '{asset.parent.name} - {asset.name}' },
              {
                name: 'Date/Time',
                key: '{date::date}: {time::start} - {time::end}',
                badge: true,
                title: true,
              },
              { name: 'Activities', key: 'activity', title: true },
              {
                name: 'Actions',
                key: 'actions',
                sub: [
                  {
                    component: 'Group',
                    sub: [
                      {
                        component: 'ModalButtonForm',
                        formId: 'casualusage',
                        itemId: '{row.id || id}',
                        icon: 'Edit',
                        tooltip: 'Edit this usage item',
                        title: '',
                        compact: true,
                        sentValues: {
                          asset_id: id,
                        },
                      },
                      {
                        component: 'DeleteButton',
                        compact: true,
                      },
                    ],
                  },
                ],
              },
            ]}
            children={[
              <DynamicComponent
                {...{
                  component: 'Group',
                  position: 'right',
                  sub: [
                    {
                      parent_id: '63a8c879-40b6-41a8-bb44-72944c205946',
                      component: 'ModalButtonForm',
                      form_props: {
                        conditions: [{ on: 'parent_id', type: '!empty' }],
                      },
                      props: {
                        icon: 'plus',
                        text: 'Add booking',
                        position: 'left',
                        tooltip: 'Add a new booking to this application',
                        formId: 'casualusage-public',
                        itemId: 'new',
                        sentValues: {
                          asset_id: id,
                        },
                        defaultValues: {
                          parent_id: '{id || form.id}',
                          title: data.name ?? '',
                        },
                      },
                    },
                  ],
                }}
              />,
              <Group position="right">
                <ModalButtonForm
                  icon="plus"
                  text="Add booking"
                  size="xl"
                  position="left"
                  tooltip="Add a new booking to this application"
                  formId="casualusage-public"
                  itemId="new"
                  defaultValues={{
                    asset_id: asset.id,
                    title: asset.name ?? '',
                  }}
                  onSave={changeHandler}
                />
                {/* <BookingAssetListUsage
                    asset={asset}
                    changeHandler={changeHandler}
                  /> */}
              </Group>,
            ]}
          />,
        ],
      },
    },
    ...assetQuestions,
    {
      component: 'FormHeading',
      props: { text: 'Terms and conditions' },
    },
    {
      component: 'Terms',
      props: {
        readOnly: isCompleted,
        getValueFn: () => data?.terms_agreed,
      },
    },
  ]

  console.log(data)
  return (
    <div>
      <Stack>
        {fields.map((field: any) => {
          if (Object.keys(field).length === 0) {
            return <></>
          }
          return field.component === 'FormHeading' ||
            typeof field.label === 'undefined' ? (
            <DynamicComponent
              component={field.component}
              onChange={({ value, ref }: any) =>
                changeHandler({
                  type: field.type ?? 'data',
                  value,
                  reference: ref ?? field.reference,
                })
              }
              {...field.props}
            />
          ) : (
            <QuestionSimple key={field.label} label={field.label}>
              <div>
                <DynamicComponent
                  component={field.component ?? defaultComponent}
                  onChange={({ value, ref }: any) =>
                    changeHandler({
                      type: field.type ?? 'data',
                      value,
                      reference: ref ?? field.reference,
                    })
                  }
                  {...{
                    value: data?.[field.reference] ?? '',
                    ...(field.props ?? {}),
                  }}
                />
              </div>
            </QuestionSimple>
          )
        })}
        {isEmpty(data.completed) && (
          <Group position="center">
            <Button
              onClick={completeHandler}
              disabled={
                isEmpty(data?.terms_agreed) || usageQuery.data?.length === 0
              }
              icon="Save"
              text="Complete and submit"
            />
          </Group>
        )}
      </Stack>
    </div>
  )
}

export default BookingAssetListApplication
