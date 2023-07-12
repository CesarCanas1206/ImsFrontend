const form = {
  id: '9c11cc5b-d449-41ea-a7a1-4a6a2590267a',
  name: 'Venue usage',
  reference: 'venue-usage',

  endpoint: 'd/venue-usage',
  questions: [
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
    },
    {
      text: 'Monday',
      component: 'SubForm',
      props: {
        formId: 'usage-day',
        row: { day: 'Monday' },
        defaultValues: { day: 'Monday' },
      },
    },
    {
      reference: 'Monday',
      component: 'VenueUsageItem',
      props: { label: 'Monday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Tuesday',
      component: 'VenueUsageItem',
      props: { label: 'Tuesday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Wednesday',
      component: 'VenueUsageItem',
      props: { label: 'Wednesday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Thursday',
      component: 'VenueUsageItem',
      props: { label: 'Thursday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Friday',
      component: 'VenueUsageItem',
      props: { label: 'Friday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Saturday',
      component: 'VenueUsageItem',
      props: { label: 'Saturday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      reference: 'Sunday',
      component: 'VenueUsageItem',
      props: { label: 'Sunday' },
      form_props: { question_width: 0, answer_width: 12 },
    },
  ],
}

export default form
