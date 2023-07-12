const form = {
  id: '0b6af9af-1912-4256-9779-321082045b24',
  name: 'Bond refunds',
  endpoint: 'd/bond-refund',
  reference: 'bond-refund',
  questions: [
    {
      text: 'Name',
      reference: 'name',
      component: 'Input',
    },
    {
      text: 'Total',
      reference: 'total',
      component: 'InputPrice',
    },
    {
      text: 'Completed',
      reference: 'completed',
      component: 'Checkbox',
    },
  ],
}

export default form
