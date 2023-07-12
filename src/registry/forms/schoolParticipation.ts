const form = {
  id: '4763177c-02ac-437b-8ceb-e0782dd4bfac',
  name: 'School participation',
  reference: 'school-participation',
  description: 'School participation form',
  endpoint: 'usage',
  questions: [
    {
      text: 'Sport',
      reference: 'sport_id',
      component: 'Select',
      props: { endpoint: 'd/sport?sort=name' },
    },
    { text: 'Year level', reference: 'year_level', component: 'Input' },
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
      form_props: { required: true },
    },
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
