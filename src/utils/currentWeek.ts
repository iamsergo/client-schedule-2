import weeks from '../data/weeks.json'

import { Week } from '../types/Week'

export const currentWeek = () : Week => {
  const now = new Date()
  const ms = now.getTime()
  const d = now.getDay()

  const week = weeks.filter(({date : [start, end]}) => ms >= start && ms <= end)[0].week

  return (d !== 0 ? week : (week === 0 ? 1 : 0)) as Week
}