import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useAPI from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import ModalButton from '../ModalButton/ModalButton'
import AllocationApplication from '../../Preset/AllocationApplication/AllocationApplication'
import { AuthContext } from '../../../context/AuthContext'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import SendEmail, { sendEmail } from '../../Function/SendEmail/SendEmail'
import Confirm from '../../Function/Confirm/Confirm'
import Form from '../../Form/Form/Form'
import ModalButtonForm from '../ModalButtonForm/ModalButtonForm'
import { nl2brstr, toTableHTML } from 'src/utilities/strings'
import { formatDate } from '@fullcalendar/core'
import { formatTime } from 'src/utilities/dates'

// const createCalendarDates = async ({
//   id,
//   get,
//   post,
//   startDate = '2022-06-01',
//   endDate = '2022-06-30',
// }: any) => {
//   const getDaysArray = function (s: any, e: any) {
//     for (
//       var a = [], d = new Date(s);
//       d <= new Date(e);
//       d.setDate(d.getDate() + 1)
//     ) {
//       a.push(new Date(d))
//     }
//     return a
//   }

//   const t = getDaysArray(new Date(startDate), new Date(endDate))
//   const dateList = t.map((v: any) => ({
//     date: v.toISOString().slice(0, 10),
//     day: v.toLocaleDateString('en-au', { weekday: 'long' }),
//   }))

//   const allocation = await get({ endpoint: 'd/allocation/' + id })

//   const usage = allocation['venue-usage'] ?? []

//   usage.forEach((item: any) => {
//     dateList.forEach(async ({ date, day }: any) => {
//       const dayDetails = item[day] ?? {}
//       if (typeof dayDetails.from === 'undefined' || dayDetails.from === '') {
//         return null
//       }

//       await post({
//         endpoint: 'd/calendar',
//         data: {
//           parent_id: id,
//           specific_id: id,
//           responses: {
//             start: `${date} ${dayDetails?.from}`,
//             end: `${date} ${dayDetails?.to}`,
//             title: dayDetails?.activity,
//             asset_id: item.asset_id,
//             shared: dayDetails?.shared,
//           },
//           slug: 'calendar',
//         },
//       })
//     })
//   })
// }

const ApplicationButtons = ({ season, seasonId, hirer }: any) => {
  let navigate = useNavigate()
  const { get, post, put } = useAPI()
  const { hasPermission } = useContext(AuthContext)

  const form_id = season?.form ?? 'allocation'

  const newApplicationHandler = async ({ id, seasonId }: any) => {
    const allocation = await post({
      endpoint: 'booking',
      data: {
        form_id: form_id,
        parent_id: id,
        hirer_id: id,
        type: 'allocation',
        season_id: seasonId,
      },
    })
    navigate(`/application/${form_id}/` + allocation.id)
  }

  const approveApplicationHandler = async ({ id }: any) => {
    await Promise.all([
      put({
        endpoint: 'd/' + id,
        data: {
          approved: 'Yes',
        },
      }),
      sendEmail({
        template: 'allocation_approval',
        data: {
          role: '1',
        },
        replace: {
          season: season?.name,
          details: nl2brstr(
            toTableHTML([
              ['Application Id', '{application_id}'],
              ['Hirer', hirer?.name],
              ['Activities to be conducted', '{activity}'],
              ['Prime use relating to activity', '{prime_use}'],
              ['Access to toilets requested', '{public_toilets}'],
              ['Name of event to be conducted', '{name}'],
              ['Booking notes', '{comments}'],
            ]),
          ),
        },
        row: hirer,
      }),
      get({ endpoint: `buildCalendarUsage/${id}` }),
    ])
    window.location.reload()
  }

  const allocation =
    typeof hirer?.allocation !== 'undefined'
      ? hirer?.allocation
          ?.filter((item: any) => !seasonId || item.season_id === seasonId)
          ?.pop() ?? {}
      : {}
  const hasAllocation =
    typeof hirer?.allocation !== 'undefined' &&
    typeof allocation.id !== 'undefined'

  const isClient = hasPermission('client-dashboard')

  return (
    <>
      <Group position="right">
        {!hasAllocation && (
          <Button
            key="start"
            icon="add"
            text="Start application"
            tooltip="Start an application"
            variant="success"
            onClick={() =>
              newApplicationHandler({
                id: hirer.id,
                seasonId: seasonId || hirer.seasonId,
              })
            }
          />
        )}
        {/* {hasAllocation &&
          !isClient &&
          allocation.completed === '1' &&
          allocation.approved !== '1' && (
            <Button
              key="approve"
              icon="tick"
              compact
              text="Approve allocation"
              variant="success"
              tooltip="Approve application"
              onClick={() =>
                approveApplicationHandler({
                  id: allocation.id,
                })
              }
            />
          )} */}
        {hasAllocation && !(allocation.approved === '1') && (
          <Button
            key="edit"
            icon="edit"
            compact
            tooltip="Edit application"
            onClick={() => navigate(`/application/${form_id}/` + allocation.id)}
          />
        )}
        {hasAllocation && (
          <ModalButton
            key="preview"
            icon="search"
            compact
            light
            variant="primary"
            tooltip="View application"
            size="xl"
          >
            <Form formId={form_id} readOnly itemId={allocation.id} />
          </ModalButton>
        )}

        {!hasAllocation && !isClient && (
          <Confirm
            key="email"
            icon="mail"
            compact
            light
            variant="primary"
            tooltip="Send reminder email"
            title="Confirm to send the reminder email to this hirer"
          >
            <SendEmail
              row={hirer}
              template="open_reminder"
              data={{
                to: [{ email: hirer?.user?.email, name: hirer?.user?.name }],
                replace: {
                  client: 'Stonnington',
                },
              }}
            />
          </Confirm>
        )}
        {/* {hasAllocation && (
        <ModalButton
          icon="pdf"
          variant="info"
          tooltip="Download application as a PDF"
        >
          <DynamicComponent component="Pdf" row={hirer} />
        </ModalButton>
      )} */}
        {hasAllocation && (
          <ModalButtonForm
            key="participation"
            icon="Database"
            variant="primary"
            compact
            light
            tooltip="View/enter participation data"
            size="xl"
            formComponent="Participation"
            defaultValues={{ hirer_id: hirer.id }}
            parent_id={allocation.id}
            specific_id={allocation.id}
            // query={{ hirer_id: hirer.id }}
            item_specific_id={allocation.id}
            showClose
          />
        )}
      </Group>
    </>
  )
}

export default ApplicationButtons
