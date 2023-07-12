const form = {
  id: '489f8eef-4d56-4ae1-ad3f-fea88b166e1a',
  name: 'Invoice',
  reference: 'invoice',

  endpoint: 'd/invoice',
  questions: [
    {
      text: 'Invoice number',
      reference: 'number',
      component: 'ReadOnly',
      form_props: { conditions: [{ on: 'id', type: '!empty' }] },
    },
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Date', reference: 'date', component: 'Date' },
    {
      text: 'Items',
      reference: 'items',
      component: 'CostItems',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    { text: 'Total', reference: 'total', component: 'InputPrice' },
  ],
}

export default form
