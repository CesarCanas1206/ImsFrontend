import { getObjectValue } from '../utilities/objects'
import useAPI from './useAPI'

const getDaysArray = function (s: any, e: any) {
  for (
    var a = [], d = new Date(s);
    d <= new Date(e);
    d.setDate(d.getDate() + 1)
  ) {
    a.push(new Date(d))
  }
  return a
}

function useCalendarEvents() {
  const { get, post } = useAPI()

  const loadEvents = async () => {
    const events: any = []
    return events
  }

  const createCalendarDates = async ({ id, slug = 'calendar' }: any) => {
    const allocation = await get({ endpoint: 'd/allocation/' + id })

    const start = getObjectValue('season.start', allocation)
    const end = getObjectValue('season.end', allocation)

    const t = getDaysArray(new Date(start), new Date(end))
    const dateList = t.map((v: any) => ({
      date: v.toISOString().slice(0, 10),
      day: v.toLocaleDateString('en-au', { weekday: 'long' }),
    }))

    const venueUsage = await get({
      endpoint: 'usage?specific_id=' + id,
    })

    venueUsage.forEach((item: any) => {
      dateList.forEach(async ({ date, day }: any) => {
        const dayDetails = item
        if (
          day !== item.day ||
          typeof dayDetails.start === 'undefined' ||
          dayDetails.start === ''
        ) {
          return null
        }

        await post({
          endpoint: 'd/' + slug,
          data: {
            parent_id: id,
            specific_id: id,
            start: `${date} ${dayDetails?.start}`,
            end: `${date} ${dayDetails?.end}`,
            title: dayDetails?.activity,
            asset_id: item.asset_id,
            shared: dayDetails?.shared,
            slug: slug,
          },
        })
      })
    })
  }

  return { loadEvents, createCalendarDates }
}

export default useCalendarEvents
