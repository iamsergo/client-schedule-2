import weeks from '../data/weeks.json'

import { Week } from '../types/Week'

export const currentWeek = () : Week => {
  const d = new Date().getTime()

  return (weeks.filter(({date : [start, end]}) => d >= start && d <= end)[0].week) as Week
}