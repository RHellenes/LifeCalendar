import type { EventType } from '@/types'
import { splitEvent, constructLifeSpan } from '@/utils/import_from_legacy'

export const birthday = '1992-02-11'
export const lifeExpectancy = 80

export const testEvents: EventType[] = [
  {
    id: 'event0',
    startDate: '1995-03-16',
    title: 'Event uten sluttdato',
    color: '#bada55'
  },
  {
    id: 'event0',
    startDate: '1995-02-25',
    title: 'Event uten sluttdato',
    color: 'green'
  },
  {
    id: 'event3',
    startDate: '1999-12-25',
    endDate: '2000-01-04',
    title: 'Event over flere uker over nyttår',
    color: 'lightblue'
  },
  {
    id: 'event2',
    startDate: '2000-02-10',
    endDate: '2008-06-24',
    title: 'Event over flere uker i samme år',
    color: '#64748b'
  },
  {
    id: 'event1',
    startDate: '2005-07-25',
    title: 'Event uten sluttdato',
    color: 'purple'
  }
]
export const splittedEvents = testEvents.map(event => splitEvent(event, birthday)).flat(1)

export const emptyLife = constructLifeSpan(birthday, lifeExpectancy)
