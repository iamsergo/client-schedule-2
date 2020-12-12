export const toEnd = () => {
  const start = new Date(2020, 8, 1).getTime()
  const now = new Date().getTime()
  const end = new Date(2021, 0, 3).getTime()

  const DAYS = 1000 * 60 * 60 * 24

  const wasted = (now - start) / DAYS
  const total  = (end - start) / DAYS
  const diff   = (end - now) / DAYS

  return [wasted, total, diff].map(Math.floor)
}