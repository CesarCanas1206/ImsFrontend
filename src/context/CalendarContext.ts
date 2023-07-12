import { createContext } from 'react'

type CalendarTypes = {
  view?: string
  setView?: () => void
  currentDate?: string
  setCurrentDate?: () => void
  reloadCalendar?: () => void
  items?: object[]
  format?: {}
  agendaView?: boolean
  setAgendaView?: () => void
  agendaKey?: string
  agendaData?: object[]
}

export const CalendarContext = createContext<CalendarTypes>({
  view: '',
  setView: () => {},
  currentDate: '',
  setCurrentDate: () => {},
  reloadCalendar: () => {},
  items: [],
  format: {},
  agendaView: false,
  setAgendaView: () => {},
  agendaKey: '',
  agendaData: [],
})

export default CalendarContext
