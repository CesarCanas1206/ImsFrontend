const form = {
  id: 'fb6f18d4-a855-424c-b9be-f21c7c5d7bff',
  name: 'Casual',
  reference: 'casualusage',
  workflow: ['validate.usage'],
  category: 'booking',
  description: 'Casual venue usage',
  endpoint: 'usage',
  questions: [
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
      form_props: { required: true },
    },
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
      text: 'Recurring event',
      component: 'RepeatEvent',
    },
    {
      text: '',
      component: 'UsageDateErrors',
    },
    {
      id: '779e4d40-3123-4e60-85de-e0fc4657bff3',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: '779e4d40-3123-4e60-85de-e0fc4657bff3',
      text: 'Shared',
      reference: 'shared',
      component: 'Checkbox',
      form_props: {
        help: 'Whether this booking area can be shared with other users',
      },
    },
  ],
}

export default form
