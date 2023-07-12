const form = {
  id: 'b239e601-7e6a-4f72-b1f7-a858e6fb3867',
  name: 'Training details form',
  reference: 'training-details',
  endpoint: 'usage',
  questions: [
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
      form_props: { required: true },
    },
    { text: 'Group size', reference: 'group_size', component: 'Input' },
    {
      text: 'Day',
      reference: 'day',
      component: 'Select',
      props: {
        options: [
          { value: 'Monday', label: 'Monday' },
          { value: 'Tuesday', label: 'Tuesday' },
          { value: 'Wednesday', label: 'Wednesday' },
          { value: 'Thursday', label: 'Thursday' },
          { value: 'Friday', label: 'Friday' },
          { value: 'Saturday', label: 'Saturday' },
          { value: 'Sunday', label: 'Sunday' },
        ],
      },
      form_props: { required: true },
    },
    {
      text: 'Start/End',
      component: 'TimeRange',
    },
    {
      text: 'Activities',
      reference: 'activity',
      component: 'Input',
      props: {
        suggestions: ['Training', 'Match', 'Meeting'],
        placeholder: 'E.g. Training, Match, Meeting',
      },
      form_props: { required: true },
    },
  ],
}

export default form
