const form = {
  id: '4a2882b2-8710-4368-a78e-7abc2e17c84b',
  name: 'Closure',
  reference: 'closure',
  description: 'Closure form',
  endpoint: 'calendar',
  questions: [
    {
      component: 'Heading',
      props: { text: 'Venue closure' },
    },
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      form_props: { required: 'true' },
    },
    {
      text: 'All day',
      reference: 'allday',
      component: 'Switch',
    },
    {
      text: 'Starts',
      reference: 'start',
      component: 'DateTime',
      form_props: { required: 'true' },
    },
    {
      text: 'Ends',
      reference: 'end',
      component: 'DateTime',
      form_props: { required: 'true' },
    },
    {
      text: 'Reason',
      reference: 'title',
      component: 'Input',
      form_props: { required: 'true' },
    },
  ],
}

export default form
