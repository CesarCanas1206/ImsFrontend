import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Button from 'src/components/Form/Button/Button'
import Form from 'src/components/Form/Form/Form'
import QuestionSimple from 'src/components/Form/Question/QuestionSimple'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Prompt from 'src/components/Function/Prompt/Prompt'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'
import DataGrid from 'src/components/UI/DataGrid/DataGrid'
import Group from 'src/components/UI/Group/Group'
import ItemStatus from 'src/components/UI/ItemStatus/ItemStatus'
import Stack from 'src/components/UI/Stack/Stack'
import FormContext from 'src/context/FormContext'
import { get, put, post } from 'src/hooks/useAPI'
import useRegistryQuery from 'src/hooks/useRegistryQuery'
import { formatDate, formatTime } from 'src/utilities/dates'
import {
  isEmpty,
  nl2brstr,
  toTableHTML,
  recursiveNameFromParentBuilder,
} from 'src/utilities/strings'

let questionSavingQueue: any = []

function BookingFormApplication({ id, isApproving = false }: any) {
  const params = useParams()
  let navigate = useNavigate()

  id = id ?? params.id
  isApproving = Boolean(isApproving)

  const [data, setData] = useState<any>({})
  const [hirer, setHirer] = useState<any>({})
  const [user, setUser] = useState<any>({})
  const [assetQuestions, setAssetQuestions] = useState<any>([])

  const usageQuery = useQuery(
    'usage',
    async () => {
      const results = await get({
        endpoint: 'usage?parent_id=' + id + '&withParent',
      })

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
          form_props: q.form_props ?? {},
        })
      })

      setAssetQuestions(Object.values(questions).flat())

      return results
    },
    { enabled: typeof id !== 'undefined' },
  )

  const notesQuery = useQuery(
    'notes',
    () => get({ endpoint: 'd/notes?parent_id=' + id + '&withAuthor' }),
    { enabled: typeof id !== 'undefined' && isApproving },
  )

  const ref = useRef(0)

  useEffect(() => {
    if (ref.current) {
      return
    }
    ref.current = 1
    get({
      endpoint: `booking/${id}`,
    })
      .then((res) => {
        setHirer(res?.hirer ?? {})
        setData(res)
        return res
      })
      .then((result) => {
        const primaryContact = result?.hirer_users?.find((f: any) => f.primary)
        const user = primaryContact?.user || result?.hirer_users?.[0]?.user
        setUser(user ?? {})
        if (isEmpty(user)) {
          post({
            endpoint: `user`,
            data: {
              first_name: 'New',
              last_name: 'Contact',
              role_id: '4',
            },
          }).then((res) => {
            setUser((prev: any) => ({
              ...prev,
              ...{
                id: res.id,
                first_name: 'New',
                last_name: 'Contact',
                role_id: '4',
              },
            }))
            post({
              endpoint: `hirer-user`,
              data: {
                hirer_id: result?.hirer.id,
                user_id: res.id,
              },
            })
          })
        }
      })
  }, [])

  const { data: forms, isLoading } = useRegistryQuery({
    endpoint: 'form?with=questions',
    category: 'casual',
  })

  if (isLoading) {
    return <></>
  }

  const isCompleted = data?.completed === 'Yes'
  const defaultComponent = isCompleted && isApproving ? 'ReadOnly' : 'Input'

  const form = forms?.find(
    (f: any) => f.id === data.form_id || f.reference === data?.form_id,
  )

  let formQuestions: any = []
  form?.questions.map((q: any) => {
    formQuestions.push({
      label: q.label ?? q.text,
      component:
        isCompleted && isApproving
          ? 'ReadOnly'
          : q.component ?? q.type ?? 'Input',
      reference: q.reference ?? '',
      question_order: q.question_order ?? 0,
      props: q.props ?? {},
      form_props: q.form_props ?? {},
    })
  })

  formQuestions = Object.values(formQuestions).flat()

  const changeHandler = ({ type, value, reference }: any) => {
    let id = data.id
    let endpoint = `booking/${id}`
    if (type === 'hirer') {
      setHirer((prev: any) => ({ ...prev, [reference]: value }))
      id = hirer.id
      endpoint = 'hirer/' + id
    } else if (type === 'user') {
      setUser((prev: any) => ({
        ...prev,
        [reference]: value,
      }))
      id = user?.id
      endpoint = `user/${id}`
    } else {
      setData((prev: any) => ({ ...prev, [reference]: value }))
    }

    if (questionSavingQueue[reference]) {
      clearTimeout(questionSavingQueue[reference])
    }
    questionSavingQueue[reference] = setTimeout(() => {
      put({
        endpoint,
        data: { [reference]: value },
      })
    }, 800)
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
                    ['Venue', recursiveNameFromParentBuilder(item.asset)],
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

  const approveHandler = async () => {
    if (usageQuery.data?.length === 0) {
      console.log('Usage not added')
      return
    }

    changeHandler({ reference: 'approved', value: 'Yes' })
    await Promise.all([
      sendEmail({
        template: 'booking_approval',
        data: {
          to: [{ email: user?.email, name: user?.name }],
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
                    ['Venue', recursiveNameFromParentBuilder(item.asset)],
                    ['Booking date', formatDate(item.date)],
                    [
                      'Booking time',
                      formatTime(item.start) + ' - ' + formatTime(item.end),
                    ],
                    ['Activity', item.title],
                  ]),
                )
                .join('<br /><br />') +
              (notesQuery.data?.length > 0
                ? '<br /><br />' +
                  toTableHTML([
                    'Notes',
                    ...(notesQuery?.data?.map(
                      (item: any) =>
                        item.note +
                        '<br/>' +
                        formatDate(item.created_at) +
                        ' By ' +
                        item.created_name,
                    ) ?? []),
                  ])
                : ''),
          ),
        },
        row: data,
      }),
      get({ endpoint: `buildCalendarUsage/${id}` }),
    ])
    navigate(-1)
  }

  const declineHandler = async ({ reason }: any) => {
    if (usageQuery.data?.length === 0) {
      console.log('Usage not added')
      return
    }
    changeHandler({ reference: 'approved', value: 'No' })
    changeHandler({ reference: 'declined', value: 'Yes' })
    if (reason) {
      changeHandler({ reference: 'declined_reason', value: reason })
    }
    await sendEmail({
      template: 'booking_declined',
      data: {
        to: [{ email: user?.email, name: user?.name }],
      },
      replace: {
        details: nl2brstr(
          toTableHTML([
            ['Reason for being declined', reason],
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
                  ['Venue', recursiveNameFromParentBuilder(item.asset)],
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
    })
    navigate(-1)
  }

  const hasFees = isApproving
  const { completed, approved, rejected, declined } = data

  const feeQuestions =
    !hasFees || !isApproving
      ? []
      : [
          {
            component: 'FormHeading',
            props: { text: 'Booking fees' },
          },
          {
            component: 'Fees',
            props: {
              id,
              usage: usageQuery.data,
              hirer,
              readOnly: approved === 'Yes',
            },
          },
        ]

  const adminNotes = !isApproving
    ? []
    : [
        {
          component: 'FormHeading',
          props: { text: 'Notes - show in approval/rejection email' },
        },
        {
          component: 'Fragment',
          props: {
            sub: [
              <DataGrid
                key={notesQuery.isFetching + ''}
                queryOverride={{
                  data: notesQuery.data,
                  isLoading: notesQuery.isLoading,
                  isSuccess: notesQuery.isSuccess,
                  refetch: notesQuery.refetch,
                }}
                position="bottom"
                columns={[
                  { name: 'Blank', key: 'space', single: true },
                  { name: 'Note', key: 'note' },
                  // { name: 'Date', key: '{date::created_at} by {created_name}' },
                ]}
                children={[
                  <DynamicComponent
                    key="group"
                    component="Group"
                    position="right"
                    sub={[
                      {
                        component: 'ModalButtonForm',
                        formId: 'notes',
                        icon: 'plus',
                        position: 'left',
                        text: 'Add note',
                        itemId: 'new',
                        defaultValues: {
                          parent_id: '{id}',
                        },
                      },
                    ]}
                  />,
                ]}
              />,
            ],
          },
        },
        {
          component: 'FormHeading',
          props: { text: 'Internal notes' },
        },
        {
          component: 'DataGrid',
          props: {
            position: 'bottom',
            endpoint: `d/internal-notes?parent_id=${data.id}&withAuthor`,
            columns: [
              { name: 'Blank', key: 'space', single: true },
              { name: 'Note', key: 'note' },
              { name: 'Date', key: '{date::created_at} by {created_name}' },
            ],
            sub: [
              {
                component: 'Group',
                position: 'right',
                sub: [
                  {
                    component: 'ModalButtonForm',
                    formId: 'internal-notes',
                    icon: 'plus',
                    position: 'left',
                    text: 'Add note',
                    itemId: 'new',
                    defaultValues: {
                      parent_id: '{id}',
                    },
                  },
                ],
              },
            ],
          },
        },
      ]

  const terms = isApproving
    ? []
    : [
        {
          component: 'FormHeading',
          props: { text: 'Terms and conditions' },
        },
        {
          component: 'Terms',
          props: {
            readOnly: isCompleted,
            getValueFn: () => data?.terms_agreed,
            declaration: form?.declaration,
            privacyHeading: form?.privacyheading,
            privacy: form?.privacy,
            onBehalf: form?.onbehalf,
          },
        },
      ]

  let form_props = {
    question_width: 4,
    answer_width: 8,
    required: false,
    readOnly: isCompleted && isApproving,
  }

  const fields = [
    {
      component: 'SetTitle',
      props: { text: form?.formheading ?? 'Booking application summary' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Booking application summary' },
    },
    {
      label: 'Application Id',
      reference: 'application_id',
      component: 'ReadOnly',
    },
    {
      label: 'Status',
      component: 'ItemStatus',
      props: { prefix: '', row: data },
    },
    {
      label: 'Name of Hirer / Group / Individual',
      reference: 'name',
      component: 'ReadOnly',
      type: 'hirer',
      props: { value: hirer.name },
    },
    {
      label: 'Hirer contact first name',
      reference: 'first_name',
      type: 'user',
      props: { value: user?.first_name },
      form_props: { questionWidth: 4, answerWidth: 4 },
    },
    {
      label: 'Hirer contact last name',
      reference: 'last_name',
      type: 'user',
      props: { value: user?.last_name },
      form_props: { questionWidth: 4, answerWidth: 4 },
    },
    {
      label: 'Hirer contact phone',
      reference: 'phone',
      type: 'user',
      props: { value: user?.phone },
      form_props: { questionWidth: 4, answerWidth: 4 },
    },
    {
      label: 'Hirer contact email',
      reference: 'email',
      type: 'user',
      props: { value: user?.email },
      form_props: { questionWidth: 4, answerWidth: 4 },
    },
    {
      label: 'Account number',
      reference: 'account_no',
      type: 'hirer',
      props: { value: hirer?.account_no, required: false },
      form_props: { questionWidth: 4, answerWidth: 4 },
    },
    {
      component: 'FormHeading',
      props: { text: 'Booking summary' },
    },
    ...formQuestions,
    {
      label: 'Access to toilets requested',
      reference: 'public_toilets',
      props: { value: data?.public_toilets ?? false },
      component: isCompleted && isApproving ? 'ReadOnly' : 'Switch',
    },
    {
      label: 'Booking notes',
      reference: 'comments',
      component: isCompleted && isApproving ? 'ReadOnly' : 'Textarea',
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
            queryOverride={usageQuery}
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
              {
                name: 'Venue',
                element: (row: any) => {
                  return recursiveNameFromParentBuilder(row.asset)
                },
              },
              { name: 'Description', key: 'title', title: true },
              {
                name: 'Date/Time',
                key: '{date::date}: {time::start} - {time::end}',
                badge: true,
                title: true,
              },
              { name: 'Activities', key: 'activity', title: true },
              { name: 'Attending', key: 'attending', title: true },
              {
                name: 'Actions',
                key: 'actions',
                sub: [
                  !isApproving && {
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
                          hirer_id: hirer.id,
                        },
                      },
                      {
                        component: 'Confirm',
                        title: 'Are you sure you want to delete this?',
                        tooltip: 'Delete',
                        variant: 'danger',
                        light: true,
                        compact: true,
                        icon: 'delete',
                        sub: [
                          {
                            component: 'Action',
                            props: {
                              action: 'delete',
                              endpoint: 'usage/{row.row.id || row.id || id}',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
            children={[
              !isApproving && (
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
                          formId: 'casualusage',
                          itemId: 'new',
                          sentValues: {
                            hirer_id: hirer?.id,
                          },
                          defaultValues: {
                            parent_id: '{id || form.id}',
                            title: data.name ?? '',
                          },
                        },
                      },
                    ],
                  }}
                />
              ),
            ]}
          />,
        ],
      },
    },
    ...assetQuestions,
    ...feeQuestions,
    ...adminNotes,
    {
      component: 'FormHeading',
      props: { text: 'Public Liability Certificate' },
    },
    {
      label: 'PLI',
      reference: 'public_liability',
      type: 'hirer',
      component: 'FileDoc',
      props: {
        hasExpiry: true,
        value: hirer?.public_liability,
        allowReason: true,
        // hasLicence: true,
        // prompt: 'Are you required to have a public liability certificate?',
      },
    },
    ...terms,
  ]
  // console.log(fields)
  // const formOverRide = { questions: fields }
  // console.log(formOverRide)
  return (
    <FormContext.Provider
      value={{
        getValue: (key: any) => data[key] ?? '',
        formSaveHandler: () => void 0,
      }}
    >
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
              <QuestionSimple
                key={field.label}
                label={field.label}
                props={{
                  ...form_props,
                  ...(field.form_props ?? {}),
                  ...(field.props ?? {}),
                }}
              >
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
                      ...form_props,
                      ...(field.form_props ?? {}),
                      ...(field.props ?? {}),
                    }}
                  />
                </div>
              </QuestionSimple>
            )
          })}
          {isApproving &&
            !isEmpty(data.completed) &&
            isEmpty(data?.approved) &&
            isEmpty(data?.declined) && (
              <Group position="center">
                <Prompt
                  variant="danger"
                  icon="Cancel"
                  text="Decline"
                  title="Why is this being declined?"
                  onYes={declineHandler}
                />
                <Confirm
                  variant="success"
                  icon="Tick"
                  text="Approve"
                  title="Are you sure?"
                  onYes={approveHandler}
                />
              </Group>
            )}
          {isApproving && !isEmpty(data?.completed) && (
            <Group position="center">
              <Button
                icon="Edit"
                text="Edit"
                tooltip="Edit this application"
                link={`/application/${id}`}
              />
            </Group>
          )}

          {!isApproving && isEmpty(data.completed) && (
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
    </FormContext.Provider>
  )
}

export default BookingFormApplication
