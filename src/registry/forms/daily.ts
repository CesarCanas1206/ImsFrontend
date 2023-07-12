const form = {
  id: 'b66808e0-2f2b-11ed-91f6-b4a9fc5fdfa8',
  name: 'Daily',
  reference: 'daily',

  endpoint: 'd/daily',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Break end', reference: 'break-end', component: 'Input' },
    {
      text: 'Have you done something else?',
      reference: 'something-else',
      component: 'Compliance',
    },
    { text: 'Shift end', reference: 'shift-end', component: 'Input' },
    {
      text: 'Have you locked the door?',
      reference: 'locked-door',
      component: 'Compliance',
    },
    { text: 'Shift start', reference: 'shift-start', component: 'Input' },
    {
      text: 'Are the lights on?',
      reference: 'lights-on',
      component: 'Compliance',
    },
    { text: 'Break start', reference: 'break-start', component: 'Input' },
    { text: 'Cover int', reference: 'cover-int', component: 'Input' },
  ],
}

export default form
