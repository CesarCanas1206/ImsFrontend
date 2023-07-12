const form = {
  id: '5cd3b823-5b95-4f4f-abca-c741f7e6febf',
  name: 'Holiday',
  reference: 'holiday',
  endpoint: 'calendar',
  questions: [
    {
      component: 'Heading',
      props: { text: 'Holiday' },
    },
    {
      text: 'Holiday',
      reference: 'title',
      component: 'Input',
      form_props: { required: 'true' },
    },
    {
      text: 'All day',
      reference: 'allday',
      component: 'Switch',
    },
    { text: 'Starts', reference: 'start', component: 'DateTime' },
    { text: 'Ends', reference: 'end', component: 'DateTime' },
  ],
}

export default form
