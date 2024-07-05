export interface EventType {
  id: string
  startDate: string
  endDate?: string
  title: string
  color: string
  icon?: string
}

export interface EventLocatorType {
  yearIndex: number
  weekIndex: number
  event: EventType
}

export type WeekType = {
  weekNumber: number
  status: 'Before birth' | 'Past' | 'Future' | 'Not set'
  event?: EventType
}

export type LifeType = WeekType[][]
// 52 Weeks.
export type YearType = [WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType, WeekType]
