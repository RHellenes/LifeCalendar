import { describe, it, expect } from 'vitest'
import { getYear } from 'date-fns'
import {
  getWeek,
  getYearsFromBirthYear,
  getWeekDifferenceBetweenStartAndEndDate,
  constructLifeSpan,
  splitEvent
  // fillLife
} from '../import_from_legacy'

import {
  birthday,
  // lifeExpectancy,
  testEvents
  // splittedEvents,
  // emptyLife
} from '../../testdata'

describe('General utilities', () => {
  it.each([
    ['2023-01-01', 1],
    ['2023-02-19', 8],
    ['1995-03-16', 11],
    ['2022-12-31', 52]
  ])('%# add(%i, %i) -> %i', (date: string, expectedWeekNr: number) => {
    expect(getWeek(date)).toBe(expectedWeekNr)
  })

  it.each([
    ['2023-02-19', 2023],
    ['1995-03-16', 1995],
    ['2022-12-31', 2022]
  ])('%# add(%i, %i) -> %i', (date: string, expectedWeekNr: number) => {
    expect(getYear(date)).toBe(expectedWeekNr)
  })

  it.each([
    ['2023-02-19', 28],
    ['1995-03-16', 0],
    ['2022-12-31', 27]
  ])('%# add(%i, %i) -> %i', (date: string, expectedWeekNr: number) => {
    expect(getYearsFromBirthYear(getYear('1995-03-16'), getYear(date))).toBe(
      expectedWeekNr
    )
  })
})
describe('getWeekDifference', () => {
  it.each([
    ['2023-01-01', '2023-01-01', 0],
    ['2023-02-18', '2023-02-19', 1],
    ['1995-03-16', '1996-03-16', 52],
    ['2022-12-31', '2023-01-05', 1],
    ['2022-12-31', '2024-01-01', 53],
    ['2022-12-31', '2025-01-01', 105],
    ['2022-12-31', '2026-01-01', 157]
  ])(
    '%# getWeekDifference(%i, %i) -> %i',
    (startDate: string, endDate: string, expectedWeekCount: number) => {
      expect(getWeekDifferenceBetweenStartAndEndDate(startDate, endDate)).toBe(
        expectedWeekCount
      )
    }
  )
})
describe('constructLifeSpan', () => {
  it.each([
    [birthday, 60, 0, 1, 'Before birth'],
    [
      birthday,
      60,
      getYear(new Date()) - 1 - getYear(birthday) /* 27 */,
      /* 8 */ getWeek(new Date()) - 1,
      'Past'
    ], // last week this year
    [
      birthday,
      60,
      getYear(new Date()) - 1 - getYear(birthday) /*  27 */,
      /* 9 */ getWeek(new Date()),
      'Past'
    ], // This week in this year
    [
      birthday,
      60,
      getYear(new Date()) - 1 - getYear(birthday) /*  27 */,
      /* 10 */ getWeek(new Date()) + 1,
      'Future'
    ], // Next week this year
    [birthday, 60, 50, 17, 'Future']
  ])(
    '%# constructLifeSpan(%s, %i,%i,%i,) -> %s',
    (
      startDate: string,
      lifeExpectancy: number,
      yearsInto: number,
      weekNumber: number,
      expectedResult: string
    ) => {
      expect(
        constructLifeSpan(startDate, lifeExpectancy)[yearsInto][weekNumber - 1]
          .status
      ).toBe(expectedResult)
    }
  )
  it.each([
    ['1995-03-16', 60],
    ['2003-05-07', 90]
  ])(
    '%# consists of full years(%s, %i)',
    (startDate: string, lifeExpectancy: number) => {
      const numbersOfYearsThatDontHaveExactly52Weeks = constructLifeSpan(
        startDate,
        lifeExpectancy
      ).filter(item => item.length !== 52).length
      expect(numbersOfYearsThatDontHaveExactly52Weeks).toBe(0)
    }
  )
})

describe('Do something with events', () => {
  it.each([
    [testEvents.at(0), '1995-03-16', 1],
    [testEvents.at(1), '1995-03-16', 1],
    [testEvents.at(2), '1995-03-16', 3],
    [testEvents.at(3), '1995-03-16', 436]
  ])(
    '%# Duration in weeks (%o) -> %i',
    (event, birthday, expectedNumberOfEvents: number) => {
      if (event?.startDate) {
        expect(splitEvent(event, birthday).length).toBe(expectedNumberOfEvents)
      }
    }
  )
  it.each([
    [testEvents.at(0), '1995-03-16', 0, 11],
    [testEvents.at(1), '1995-03-16', 0, 8],
    [testEvents.at(2), '1995-03-16', 1, 1],
    [testEvents.at(3), '1995-03-16', 2, 9]
  ])(
    '%# expected week pos',
    (event, birthday, eventIndex: number, expectedWeekIndex: number) => {
      if (event?.startDate) {
        expect(splitEvent(event, birthday).at(eventIndex)?.weekIndex).toBe(
          expectedWeekIndex
        )
      }
    }
  )
  it.each([
    [testEvents.at(0), '1995-03-16', 0, 1],
    [testEvents.at(1), '1995-03-16', 0, 1],
    [testEvents.at(2), '1995-03-16', 1, 5],
    [testEvents.at(3), '1995-03-16', 2, 5]
  ])(
    '%# expected year pos',
    (event, birthday, eventIndex: number, expectedYearIndex: number) => {
      if (event?.startDate) {
        expect(splitEvent(event, birthday).at(eventIndex)?.yearIndex).toBe(
          expectedYearIndex
        )
      }
    }
  )
})

// describe('Put events into life', () => {
//   it('FilledLife', () => {
//     expect(fillLife(emptyLife, splittedEvents)).toBe(2)
//   })
// })
