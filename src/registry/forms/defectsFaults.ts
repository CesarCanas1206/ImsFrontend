const form = {
  id: '6efab2b7-7c10-49d9-8809-ffcb0f8c6fbd',
  name: 'Defects/faults',
  reference: 'defect-fault',

  endpoint: 'd/defect-fault',
  questions: [
    { text: 'Files', reference: 'file', component: 'File' },
    {
      text: 'Defect location',
      reference: 'defect-location',
      component: 'Input',
    },
    {
      text: 'Defect/fault identified by',
      reference: 'identified-by',
      component: 'Select',
      props: { endpoint: 'user' },
    },
    {
      text: 'Risk ratings',
      reference: '',
      component: 'RawHtml',
      form_props: { answerWidth: 12 },
    },
    {
      text: 'Location',
      reference: 'location',
      component: 'Select',
      props: { endpoint: 'asset' },
    },
    {
      text: 'Status',
      reference: 'status',
      component: 'Radios',
      props: {
        options: [
          { label: 'Open', value: 'Open' },
          { label: 'Completed', value: 'Completed' },
        ],
      },
    },
    {
      text: 'Responsibility',
      reference: 'responsibility',
      component: 'Select',
      props: { endpoint: 'user' },
    },
    { text: 'Defect number', reference: 'defect-number', component: 'Input' },
    { text: 'New field', reference: 'new-field', component: 'Input' },
    {
      text: 'Complete',
      reference: '',
      component: 'CompleteButton',
      props: { form: 'defect-fault' },
    },
    {
      text: 'Consequence identifier',
      reference: 'consequence',
      component: 'Textarea',
    },
    {
      text: 'Date identified',
      reference: 'date-identified',
      component: 'Date',
    },
    { text: 'Comments', reference: 'comments', component: 'Textarea' },
    { text: 'Risk assessment', reference: 'risk', component: 'Textarea' },
    { text: 'Due date', reference: 'due-date', component: 'Date' },
    { text: 'Defect', reference: 'defect', component: 'Textarea' },
    { text: 'Photos', reference: 'photos', component: 'Camera' },
  ],
}

export default form
