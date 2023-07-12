const form = {
  id: 'a9d27837-4d68-45f8-a329-5382259387f7',
  name: 'Calendar',
  reference: 'calendar',
  workflow: ['validate.usage'],
  description: 'Calendar entries',
  endpoint: 'calendar',
  questions: [
    {
      component: 'Heading',
      props: { text: 'Event' },
    },
    {
      text: 'Title',
      reference: 'title',
      component: 'Input',
      form_props: { required: 'true' },
    },
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
      form_props: { required: true },
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
    // { text: 'Clashes', reference: '', component: 'ClashCheck' },
  ],
}

export default form
