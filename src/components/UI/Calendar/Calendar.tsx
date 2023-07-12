// import '@fullcalendar/react/dist/vdom'
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import useAPI, { get } from '../../../hooks/useAPI'
import Modal from '../Modal/Modal'
import Form from '../../Form/Form/Form'
import { useQuery } from 'react-query'
import Stack from '../Stack/Stack'
import Button from '../../Form/Button/Button'
import Tooltip from '../Tooltip/Tooltip'
import useIsOwner from '../../../hooks/useIsOwner'
import useHasPermission from '../../../hooks/useHasPermission'
import Icon from '../Icon/Icon'
import { formatValue } from '../../../utilities/objects'
import CalendarContext from '../../../context/CalendarContext'
import PageTitle from 'src/components/UI/PageTitle/PageTitle'
import DateUI from 'src/components/Form/Date/Date'
import Toggle from 'src/components/Form/Toggle/Toggle'

import 'src/assets/calendar.css'
import { isEmpty } from 'src/utilities/strings'
import { getYMD, getISO } from 'src/utilities/dates'
import CalendarFilters from './CalendarFilters'
import CalendarSkeleton from './CalendarSkeleton'

import ErrorBoundary from '../../../layout/ErrorBoundary/ErrorBoundary'
import AddNewBooking from '../AddNewBooking/AddNewBooking'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'

/** Settings for DynamicPage editing */
export const settings = [
  {
    name: 'view',
    label: 'Initial view',
    type: 'Select',
    options: [
      {
        name: 'Month',
        value: 'month',
      },
      {
        name: 'Week',
        value: 'week',
      },
      {
        name: 'Day',
        value: 'day',
      },
      {
        name: 'Month agenda',
        value: 'monthAgenda',
      },
      {
        name: 'Week agenda',
        value: 'weekAgenda',
      },
      {
        name: 'Day agenda',
        value: 'dayAgenda',
      },
    ],
    default: 'month',
  },
  {
    name: 'format',
    label: 'Format',
    type: 'Json',
  },
]

/**
 * Takes in any object with item, type, prefix, bg, isAdmin, checkOwner
 * Then returns a formatted object for the calendar
 * @returns object
 */
const formatItem = ({
  item,
  type,
  prefix,
  bg,
  asset,
  isAdmin,
  checkOwner,
}: any) => ({
  type: item.form_id === 'holiday' ? 'holiday' : type ?? 'calendar',
  id: item.id,
  prefix:
    prefix ?? Number(item.pending) === 1
      ? '(Pending) '
      : item.form_id === 'closure'
      ? '(Closure)'
      : '',
  title: !isAdmin ? 'Booked' : item.title ?? item.reason ?? '',
  allDay: item.allday === 'Yes' ?? false,
  start:
    item.start ?? getISO(item.start_date ?? item.date, item.start_time ?? ''),
  end:
    item.end ??
    getISO(item.end_date ?? item.start_date ?? item.date, item.end_time ?? ''),
  backgroundColor: bg ?? '#337ab7',
  borderColor: bg ?? '#337ab7',
  textColor: bg ?? '#337ab7',
  editable:
    isAdmin ||
    (typeof item.user_id !== 'undefined' && checkOwner(item.user_id)),
  asset_id: item.asset_id,
  asset: asset,
  resourceId: item.asset_id,
})

/** Background colours for calendar items */
const bgs: any = {
  1: '#666',
  closure: '#666',
  holiday: 'green',
}
/**
 * Sets up and formats the calendar items for the given start and end dates
 * @returns object with useQuery
 */
const useCalendar = ({ assetQuery, isAdmin, checkOwner, start, end }: any) => {
  const calendarQuery = useQuery({
    queryKey: ['calendar', 'items', start, end],
    queryFn: async () => {
      return !start
        ? []
        : await get({
            endpoint: `d/calendar?range=${start},${end}`,
          })
    },
    /** Format the data that's returned */
    select: (data) =>
      (typeof data.map !== 'undefined' &&
        data
          .filter(
            (item: any) =>
              typeof item.start !== 'undefined' &&
              typeof item.end !== 'undefined',
          )
          .map((item: any) =>
            formatItem({
              item,
              bg: bgs[Number(item.pending)] ?? bgs[item.form_id] ?? undefined,
              asset: assetQuery?.data?.find(
                ({ id }: any) => id === item.asset_id,
              )?.title,
              isAdmin,
              checkOwner,
            }),
          )) ??
      [],
    staleTime: 1000 * 60 * 5,
    enabled: !assetQuery.isLoading && !isEmpty(start),
  })

  return {
    calendarQuery,
  }
}

/** Available view to filter on */
const views = [
  { label: 'Month', value: 'dayGridMonth' },
  { label: 'Week', value: 'resourceTimelineWeek' },
  { label: 'Day', value: 'timeGridDay' },
  { label: 'List', value: 'resourceTimeline' },
]

/**
 * Load the assets and calendar items and display them in a full calendar
 */
function Calendar() {
  const { get, put } = useAPI()
  const [filters, setFilters] = useState({ asset_id: '', filter: '' })
  const [view, setView] = useState('resourceTimelineWeek')
  const [date, setDate] = useState(null)
  const { checkOwner } = useIsOwner()
  const { hasPermission } = useHasPermission()
  const isAdmin = hasPermission('admin') || !hasPermission('client-dashboard')
  const [state, setState] = useState<any>({})
  const calendarRef = useRef<any>()

  const assetQuery = useQuery({
    queryKey: ['calendar', 'asset'],
    queryFn: async () => {
      return get({
        endpoint: 'asset?fields=name,id,parent_id,bookable',
      })
    },
    select: (data: any) =>
      typeof data.map !== 'undefined' &&
      data.map((item: any) => ({
        id: item.id,
        title: item.name,
        ...(!isEmpty(item.parent_id) ? { parentId: item.parent_id } : {}),
      })),
  })

  /** Get current range from calendarRef */
  const range =
    calendarRef?.current?.calendar?.currentData?.dateProfile?.currentRange
  const start = useMemo(() => getYMD(range?.start), [range, date, view])
  const end = useMemo(() => getYMD(range?.end), [range, date, view])

  /** Get calendar items */
  const { calendarQuery }: any = useCalendar({
    assetQuery,
    isAdmin,
    checkOwner,
    start,
    end,
  })

  let items: object[] = []
  const reloadCalendar = async () => {
    calendarQuery.refetch()
    items = []
  }

  /** Close the adding modal */
  const closeModal = () => {
    setState({
      ...state,
      editingEvent: '',
      addingEvent: '',
      addingEventSelector: false,
      eventForm: '',
      openModal: false,
      editable: true,
      initialData: {},
    })
  }

  /** Save a change to an event */
  const saveEventHandler = useCallback(
    async (id: string | number, data: any, type: string | undefined) => {
      await put({
        endpoint: `${type ?? 'calendar'}/${id}`,
        data: { responses: data },
      })
    },
    [],
  )

  /** Change the calendars view if changed from the filters */
  useEffect(() => {
    calendarRef?.current?.calendar.changeView(view)
    reloadCalendar()
  }, [view])

  /** Change the calendars date if changed from the filters */
  useEffect(() => {
    if (date === null) {
      return
    }
    calendarRef?.current?.calendar?.gotoDate(date)
    reloadCalendar()
  }, [date])

  const providerValues = useMemo(() => ({ reloadCalendar }), [])

  if (assetQuery.isLoading) {
    return <CalendarSkeleton />
  }

  let resources = assetQuery?.data ?? []

  items = calendarQuery.data ?? []

  /** If search filter set, look in the calendar item's title */
  if (!isEmpty(filters?.filter)) {
    items = items.filter(({ title }: any) =>
      title?.toLowerCase().includes(filters?.filter),
    )
  }

  /** If the asset filter is set, check for parent and children related to the selection */
  if (!isEmpty(filters?.asset_id)) {
    const assetIdFilter = formatValue(filters?.asset_id)
    resources = resources
      .filter(
        (item: any) =>
          assetIdFilter.includes(item.id) ||
          assetIdFilter.includes(item.parentId),
      )
      .map(({ parentId, ...item }: any) => ({
        ...item,
        ...(assetIdFilter.includes(parentId) ? { parentId: parentId } : {}),
      }))

    items = items.filter(({ asset_id }: any) =>
      resources.map(({ id }: any) => id).includes(asset_id),
    )
  }

  /** When a date is selected on the calendar */
  const dateBoxSelectHandler = (selectInfo: any) => {
    if (!isAdmin) {
      return
    }
    const assetId =
      typeof selectInfo.resource !== 'undefined'
        ? { asset_id: selectInfo.resource.id }
        : {}

    setState({
      ...state,
      addingEvent: '',
      addingEventSelector: true,
      editingEvent: '',
      openModal: true,
      editable: true,
      initialData: {
        ...assetId,
        start: `${getYMD(selectInfo.startStr)} ${formatDate(
          selectInfo.startStr,
          {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
          },
        )}`,
        end: `${getYMD(
          selectInfo.allDay ? selectInfo.startStr : selectInfo.endStr,
        )} ${formatDate(selectInfo.endStr, {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        })}`,
        date: getYMD(selectInfo.startStr),
      },
    })
  }

  /** When an event is clicked */
  const eventClickHandler = (clickInfo: any) => {
    setState({
      ...state,
      addingEvent: '',
      addingEventSelector: false,
      editingEvent: clickInfo.event.id,
      eventForm: clickInfo.event.extendedProps.type,
      openModal: true,
      editable: clickInfo.event.durationEditable !== false,
    })
  }

  /** When an event is changed on the calendar */
  const eventChangeHandler = ({ event }: any) => {
    const type = event.extendedProps.type ?? 'calendar'
    const asset =
      typeof event._def.resourceIds !== 'undefined'
        ? { asset_id: JSON.stringify(event._def.resourceIds) }
        : {}

    const data =
      type === 'holiday'
        ? {
            date: event.startStr,
          }
        : {
            ...asset,
            start: `${getYMD(event.startStr)} ${formatDate(event.startStr, {
              hour: 'numeric',
              minute: '2-digit',
              hour12: false,
            })}`,
            end: `${getYMD(event.endStr)} ${formatDate(
              event.endStr ?? event.startStr,
              {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false,
              },
            )}`,
          }

    saveEventHandler(event.id, data, type)
  }

  return (
    <CalendarContext.Provider value={providerValues}>
      <LoadingOverlay
        visible={typeof calendarRef?.current?.calendar === 'undefined'}
      />
      <PageTitle title="Calendar">
        <CalendarFilters filters={filters} setFilters={setFilters}>
          <Toggle
            value={view}
            options={views}
            onChange={({ value }: any) => setView(value)}
            required
          />
          <DateUI
            value={date ?? calendarRef?.current?.calendar?.getDate()}
            onChange={({ value }: any) => setDate(value)}
          />
        </CalendarFilters>
      </PageTitle>
      {state.openModal && (
        <Modal opened={true} size="xl" onClick={closeModal}>
          <Suspense fallback="">
            {state.editingEvent !== '' && (
              <Form
                readOnly={!state.editable}
                formId={state.eventForm || 'calendar'}
                itemId={state.editingEvent}
              />
            )}
            {state.addingEventSelector && (
              <AddNew
                onClick={(type: any) => {
                  setState({
                    ...state,
                    addingEvent: type,
                    addingEventSelector: false,
                  })
                }}
              />
            )}
            {state.addingEvent !== '' && state.addingEvent === 'casual' && (
              <AddNewBooking usageData={state.initialData ?? {}} />
            )}
            {state.addingEvent !== '' && state.addingEvent !== 'casual' && (
              <Form
                formId={state.addingEvent || 'calendar'}
                defaultValues={state.initialData}
                save_button_text={'Submit for approval'}
                onSave={(values: any) => reloadCalendar()}
              />
            )}
          </Suspense>
        </Modal>
      )}
      <ErrorBoundary>
        <FullCalendar
          ref={calendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            resourceTimelinePlugin,
            resourceTimeGridPlugin,
          ]}
          scrollTime="12:00:00"
          headerToolbar={false}
          stickyHeaderDates
          resources={resources}
          resourceOrder="title"
          resourceAreaColumns={[
            {
              field: 'title',
              headerContent: 'Venues',
            },
          ]}
          views={{
            resourceTimelineWeek: {
              slotDuration: { days: 1 },
            },
            resourceTimeGridFourDay: {
              type: 'resourceTimeGrid',
              duration: { days: 4 },
              buttonText: '4 days',
            },
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}
          locale="en-AU"
          initialView="resourceTimelineWeek"
          editable
          eventDurationEditable
          selectable={isAdmin}
          selectMirror
          dayMaxEvents
          height="auto"
          events={items}
          select={dateBoxSelectHandler}
          eventClick={eventClickHandler}
          eventContent={RenderEventContent}
          eventChange={eventChangeHandler}
        />
      </ErrorBoundary>
    </CalendarContext.Provider>
  )
}

/** Render function for each event on the calendar */
function RenderEventContent(eventInfo: any) {
  const isResourceView = eventInfo.view?.type.includes('resource')
  const event = eventInfo.event ?? {}
  const { extendedProps } = event ?? { extendedProps: {} }

  const start = event.start.toLocaleDateString()
  const end = event.end?.toLocaleDateString() ?? null
  return (
    <Tooltip
      label={
        <>
          {event.title}
          {typeof extendedProps.asset === 'string' &&
            ' - ' + extendedProps.asset}
          <div>
            {start}
            {end && start !== end && <> - {end}</>}
          </div>
        </>
      }
      zIndex={110}
      withinPortal
    >
      <div style={{ overflow: 'hidden' }}>
        <b style={{ fontWeight: 500 }}>
          {event.title}
          {!isResourceView &&
            typeof extendedProps.asset === 'string' &&
            ' - ' + extendedProps.asset}
        </b>
        {typeof extendedProps.prefix === 'string' && (
          <div>
            <small>{extendedProps.prefix}</small>
          </div>
        )}
        <div style={{ fontSize: '0.8em' }}>
          <Icon fontSize="inherit" type="Clock" />{' '}
          {!event.allDay && eventInfo.timeText}
          {event.allDay && 'All day'}
        </div>
      </div>
    </Tooltip>
  )
}

/** Function for content when adding a new item (clicking on calendar date) */
function AddNew({ onClick }: any) {
  return (
    <Stack>
      <Button text="Booking" onClick={() => onClick('casual')} />
      <Button text="Holiday" onClick={() => onClick('holiday')} />
      <Button text="Venue closure" onClick={() => onClick('closure')} />
    </Stack>
  )
}

export default Calendar
