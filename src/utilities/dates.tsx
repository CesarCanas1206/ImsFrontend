import dayjs from 'dayjs'

export const getYMD = (dateStr: string | Date) => {
  if (!dateStr) return null
  if (
    typeof dateStr === 'object' &&
    typeof dateStr.toISOString !== 'undefined'
  ) {
    dateStr = dateStr?.toISOString()
  } else if (typeof dateStr === 'string' && dateStr.includes('T')) {
    dateStr = dateStr.split('T')[0]
  }
  return dayjs(String(dateStr)).format('YYYY-MM-DD')
}

export const formatDate = (date: string, format = 'D MMMM YYYY') => {
  if (!date) return null
  return dayjs(date).format(format)
}

export const getISO = (date: string, time = '00:00') => {
  const [hour, minute] = time?.split(':') ?? ['0', '0']
  const d = new Date(date)
  d.setHours(Number(String(hour)?.replace(/[^0-9]+/g, '') ?? 0))
  d.setMinutes(Number(String(minute)?.replace(/[^0-9]+/g, '') ?? 0))
  return d.toISOString()
}

export const timeToDecimal = (time: any) => {
  const displayTimes: any = {
    Midnight: '00:00',
    '12:00pm': '12:00',
  }
  const [hours, minutes] = ((displayTimes[time] ?? time)
    ?.split(':')
    .map(parseFloat) as [number, number]) ?? [0, 0]

  return hours + minutes / 60
}

export const decimalToTime = (decimal: number) => {
  let hours = Math.floor(decimal)
  let minutes = Math.round((decimal - hours) * 60)

  if (minutes === 60) {
    hours++
    minutes = 0
  }

  const hoursStr = hours < 10 ? '0' + hours : hours.toString()
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString()

  return `${hoursStr}:${minutesStr}`
}

export const getTimeArray = (start: any, end: any, increment: any = 15) => {
  const timeArray = []
  increment = increment / 60
  for (let i = start; i <= end; i += increment) {
    timeArray.push(decimalToTime(i))
  }
  return timeArray
}

export const getDaysArray = function (s: any, e: any) {
  let a = [],
    d = new Date(s)
  while (d <= new Date(e)) {
    a.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return a
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time?.split(':').map(Number) as [number, number]
  const period = hours >= 12 ? 'pm' : 'am'
  const hours12 = hours % 12 || 12

  const displayTimes: any = {
    '00:00': 'Midnight',
    '12:00': '12:00pm',
  }

  return (
    displayTimes[time] ??
    `${hours12}:${(minutes ?? '00').toString().padStart(2, '0')}${period}`
  )
}

const addBasedOnPattern = ({ pattern, date }: any) => {
  switch (pattern) {
    case 'dayweekly': {
      return date.add(1, 'day')
    }
    case 'weekly': {
      return date.add(1, 'week')
    }
    case 'fortnightly': {
      return date.add(2, 'week')
    }
    case 'fourweekly': {
      return date.add(4, 'week')
    }
    case 'monthly': {
      return date.add(1, 'month')
    }
    case 'quarterly': {
      return date.add(3, 'month')
    }
    case 'yearly': {
      return date.add(1, 'year')
    }
    default: {
      return date.add(1, 'day')
    }
  }
}

export const datesFromPattern = ({
  pattern,
  date,
  end,
  day,
  times,
  exclude,
}: {
  pattern: string
  date: string | Date
  end: string | Date
  day: string
  times: string | number
  exclude: string[]
}) => {
  const dates = []
  let current = dayjs(date)
  const end_date = dayjs(end)

  const excludeDates = exclude.map((date) => dayjs(date).format('YYYY-MM-DD'))

  let dateAllowed = null

  if (typeof times !== 'undefined' && times !== 0 && times != '') {
    for (let i = 0; i < Number(times); i++) {
      const formatted = current.format('YYYY-MM-DD')

      dateAllowed = !excludeDates.includes(formatted)

      if (
        dateAllowed &&
        pattern === 'dayweekly' &&
        typeof day !== 'undefined'
      ) {
        dateAllowed = current.format('dddd') === day
      }
      if (dateAllowed) {
        dates.push(formatted)
      }
      current = addBasedOnPattern({ pattern, date: current })
    }
    return dates
  }

  while (current <= end_date) {
    const formatted = current.format('YYYY-MM-DD')
    dateAllowed = !excludeDates.includes(formatted)

    if (dateAllowed && pattern === 'dayweekly' && typeof day !== 'undefined') {
      dateAllowed = current.format('dddd') === day
    }
    if (dateAllowed) {
      dates.push(formatted)
    }
    current = addBasedOnPattern({ pattern, date: current })
  }
  return dates
}

export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
