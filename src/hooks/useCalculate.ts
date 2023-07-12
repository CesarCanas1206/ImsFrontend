import dayjs from 'dayjs'

const calculateHours = (values: any) => {
  const endDate = dayjs(values.end ?? new Date())
  const startDate = values.start ?? new Date()

  return endDate.diff(startDate, 'hour', true)
}

const calculateTotal = (qty: number | string, price: number | string) => {
  return (Number(qty) * Number(price)).toFixed(2)
}

function useCalculate() {
  return {
    calculateHours,
    calculateTotal,
  }
}

export default useCalculate
