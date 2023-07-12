const form = {
  id: 'fc5b5648-858d-43cc-ba74-801f7f463d3c',
  name: 'Casual',
  reference: 'casualusage-public',
  workflow: ['validate.usage'],
  category: 'booking',
  description: 'Public Casual venue usage',
  endpoint: 'usage',
  questions: [
    {
      text: 'Booking description',
      reference: 'title',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'Number attending',
      reference: 'attending',
      component: 'Input',
    },
    {
      text: 'Date',
      component: 'Date',
      reference: 'date',
      props: { minDate: 'today' },
      form_props: { required: true },
    },
    {
      text: 'Start/End',
      component: 'TimeRange',
    },
    {
      text: 'Repeating',
      component: 'RepeatEvent',
    },
  ],
}

export default form
