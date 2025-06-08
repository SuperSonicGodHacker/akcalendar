export interface Event {
  id?: string
  date: number
  month: number
  year: number
  title: string
  type: string
  isAdministrative: boolean
  description?: string
}

export function parseEventDate(dateString: string): { date: number; month: number; year: number } {
  const [year, month, day] = dateString.split("-").map(Number)
  return {
    date: day,
    month: month - 1, // JavaScript months are 0-indexed
    year: year,
  }
}

export function formatEventForCalendar(
  title: string,
  description: string,
  dateString: string,
  category: string,
): Event {
  const { date, month, year } = parseEventDate(dateString)

  return {
    date,
    month,
    year,
    title,
    type: category,
    isAdministrative: false,
    description,
  }
}
