export const getBusinessDaysInMonths = (months: number) => {
  const date = new Date()
  const estimatedPeriodDate = new Date()
  estimatedPeriodDate.setMonth(estimatedPeriodDate.getMonth() + months)

  let count = 0
  const curDate = new Date(date.getTime())
  while (curDate <= estimatedPeriodDate) {
    const dayOfWeek = curDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++
    curDate.setDate(curDate.getDate() + 1)
  }
  return count
}
