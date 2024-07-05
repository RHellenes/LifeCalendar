import {
  differenceInWeeks,
  getWeek as getDateFnsWeek,
  getYear
  // startOfWeek,
  // addWeeks,
  // subWeeks,
  // isAfter,
  // isBefore,
  // isEqual
} from 'date-fns'

import type {
  EventType,
  WeekType,
  LifeType,
  EventLocatorType
} from '@/types'

export const weekDifference = (
  startDate: Date,
  endDate = new Date()
): number => {
  return Math.abs(differenceInWeeks(endDate, startDate))
}

export const getWeek = (date: string | Date): number => {
  // min: 1 | max: 52
  let weekNumber = getDateFnsWeek(new Date(date))
  if (weekNumber === 53) {
    weekNumber = 52
  }
  return weekNumber
}

export const getYearsFromBirthYear = (birthdate: number, eventYear: number) =>
  eventYear - birthdate

export const getWeekDifferenceBetweenStartAndEndDate = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return differenceInWeeks(end, start)
}

export const constructLifeSpan = (
  birthday: string,
  lifeExpectancy: number
): LifeType => {
  const birthDate = new Date(birthday)
  const birthWeek = getWeek(birthDate)
  const weeksBeforeBirth = birthWeek - 1

  const baseWeekObject: WeekType = { weekNumber: -1, status: 'Not set' }
  const createYear = (length: number): WeekType[] =>
    Array.from({ length }, () => baseWeekObject)
  const yearFormat = createYear(52)

  const populatedFirstYear: WeekType[] = yearFormat.map(
    (_, index): WeekType =>
      index < weeksBeforeBirth
        ? { weekNumber: index + 1, status: 'Before birth' }
        : { weekNumber: index + 1, status: 'Past' }
  )

  const thisYear = getYear(new Date())
  const birthYear = getYear(birthDate)

  const arrayOfFullYearsLived = createYear(thisYear - birthYear - 2)

  const arrayOfFullYearsLeftToLive = createYear(
    lifeExpectancy - (thisYear - birthYear)
  )
  const populatedArrayOfFullYearsLived = arrayOfFullYearsLived.map(() =>
    yearFormat.map(
      (_, index): WeekType => ({ weekNumber: index + 1, status: 'Past' })
    )
  )
  const populatedArrayOfFullYearsLeftToLive = arrayOfFullYearsLeftToLive.map(
    () =>
      yearFormat.map(
        (_, index): WeekType => ({ weekNumber: index + 1, status: 'Future' })
      )
  )

  const thisWeek = getWeek(new Date())
  const populatedThisYear = yearFormat.map(
    (_, index): WeekType =>
      index < thisWeek
        ? { weekNumber: index + 1, status: 'Past' }
        : { weekNumber: index + 1, status: 'Future' }
  )
  const filledLifeSpan = [
    populatedFirstYear,
    ...populatedArrayOfFullYearsLived,
    populatedThisYear,
    ...populatedArrayOfFullYearsLeftToLive
  ]
  return filledLifeSpan
}

export const splitEvent = (
  event: EventType,
  birthday: string
): EventLocatorType[] => {
  if (!event.endDate) {
    event.endDate = event.startDate
  }
  const weekDifference = getWeekDifferenceBetweenStartAndEndDate(
    event.startDate,
    event.endDate
  )

  const arrayOfEvents = Array.from(
    {
      length:
        weekDifference
        + 1 /* We add one week to take count the last week also */
    },
    () => event
  )
  const positionLogger = {
    weekIndex: getWeek(event.startDate),
    yearIndex: getYear(new Date(event.startDate)) - getYear(new Date(birthday)) || 1
  }
  let { weekIndex, yearIndex } = positionLogger
  const arrayOfEventsWithPositions = arrayOfEvents.map(
    (eventItem, index): EventLocatorType => {
      if (index !== 0) {
        weekIndex = weekIndex === 52 ? 1 : weekIndex + 1
        yearIndex = weekIndex === 1 ? yearIndex + 1 : yearIndex
      }
      return {
        weekIndex,
        yearIndex,
        event: eventItem
      }
    }
  )
  return arrayOfEventsWithPositions
}

export const fillLife = (
  lifeSpan: LifeType,
  events: EventLocatorType[]
): LifeType => {
  const _lifeSpan = [...lifeSpan]
  events.forEach((event) => {
    if (_lifeSpan[event.yearIndex - 1] && _lifeSpan[event.yearIndex - 1][event.weekIndex - 1]) {
      _lifeSpan[event.yearIndex - 1][event.weekIndex - 1].event = event.event
    }
  })
  return _lifeSpan
}
