const form = {
  id: '330c9f8d-17d8-4f23-a4d5-595d67b40a3b',
  name: 'Seasons',
  reference: 'season',

  endpoint: 'd/season',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Start', reference: 'start', component: 'Date' },
    { text: 'End', reference: 'end', component: 'Date' },
    {
      text: 'Status',
      reference: 'status',
      component: 'Switch',
      props: { onLabel: 'Open', offLabel: 'Closed', color: 'green' },
    },
    {
      text: 'Form',
      reference: 'form',
      component: 'DatasetSelector',
      props: { endpoint: 'form?category=allocation' },
    },
    {
      text: 'Hirer type',
      reference: 'hirer_type_id',
      component: 'Select',
      props: { endpoint: 'd/hirer-type?sort_by=name' },
    },
    {
      text: 'Reminder dates',
      reference: '',
      component: 'FormHeading',
      form_props: { question_width: '12' },
    },
    { text: 'Open email', reference: 'open_email', component: 'Date' },
    { text: 'Reminder 1', reference: 'reminder_1', component: 'Date' },
    { text: 'Reminder 2', reference: 'reminder_2', component: 'Date' },
    { text: 'Reminder 3', reference: 'reminder_3', component: 'Date' },
    { text: 'Close email', reference: 'close_email', component: 'Date' },
  ],
}

export default form
