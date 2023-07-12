const form = {
  id: '034235fd-331f-4650-8bc4-7b5d7dfe6aea',
  name: 'Booking',
  reference: 'booking',
  category: 'booking',
  description: 'Booking form',
  endpoint: 'booking',
  workflow: ['create.events'],
  questions: [
    {
      component: 'Heading',
      props: { text: 'Booking' },
      reference: 'booking_heading',
      form_props: { questionWidth: 0, answerWidth: 12 },
    },
    {
      text: 'Title',
      reference: 'title',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'First name',
      reference: 'first_name',
      component: 'Input',
      form_props: { required: true },
    },
    { text: 'Last name', reference: 'last_name', component: 'Input' },
    {
      text: 'Email',
      reference: 'email',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'Mobile',
      reference: 'mobile',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'User',
      reference: 'user_id',
      component: 'Select',
      props: { endpoint: 'user?sort_by=name' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Booking request/s' },
      form_props: { question_width: '0', answer_width: '12' },
    },
    {
      text: 'Asset',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { formatted: true, bookable: true },
      form_props: { required: true },
    },
    {
      text: 'Number attending',
      reference: 'attending',
      component: 'Input',
      form_props: { required: true },
    },
    { text: 'Comments', reference: 'comments', component: 'Textarea' },
    { text: 'Starts', reference: 'start', component: 'DateTime' },
    { text: 'Ends', reference: 'end', component: 'DateTime' },
    { text: 'Recurring', reference: 'recurring', component: 'Checkbox' },
    {
      text: 'Repeat pattern',
      reference: 'repeat_pattern',
      component: 'Select',
      props: {
        data: [
          { label: 'Weekly', value: 'Weekly' },
          { label: 'Monthly', value: 'Monthly' },
        ],
      },
      form_props: { condition: { on: 'recurring', type: '!empty' } },
    },
    {
      text: 'Repeat until',
      reference: 'repeat_until',
      component: 'Date',
      form_props: { condition: { on: 'recurring', type: '!empty' } },
    },
    {
      text: 'School holidays',
      reference: 'repeat_school',
      component: 'Checkbox',
      form_props: { condition: { on: 'recurring', type: '!empty' } },
    },
    {
      text: 'Public holidays',
      reference: 'repeat_public',
      component: 'Checkbox',
      form_props: { condition: { on: 'recurring', type: '!empty' } },
    },

    { text: 'Hours', reference: 'hours', component: 'Hours' },
    { text: 'Price per hour', reference: 'price', component: 'InputPrice' },
    {
      text: 'Total',
      reference: 'total',
      component: 'Calculate',
      props: { readOnly: true },
    },
    // {
    //   component: 'FormButton',
    //   form_props: { questionWidth: 12 },
    // },
  ],
}

export default form
