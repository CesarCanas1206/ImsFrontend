const form = {
  id: 'b8d23419-697e-4a71-80eb-ba8d19a5dd78',
  name: 'Support',
  reference: 'support',

  endpoint: '',
  questions: [
    { text: 'Program', reference: '', component: 'Input' },
    { text: 'Product', reference: '', component: 'Input' },
    { text: 'Phone', reference: '', component: 'Input' },
    { text: 'Email', reference: '', component: 'Input' },
    {
      text: 'Type',
      reference: '',
      component: 'Radios',
      props: {
        options: [
          { label: 'Issue', value: 'issue' },
          { label: 'Request', value: 'request' },
        ],
      },
    },
    {
      text: 'Priority',
      reference: '',
      component: 'Radios',
      props: {
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
      },
    },
    { text: 'Subject', reference: '', component: 'Input' },
    { text: 'Details', reference: '', component: 'Textarea' },
    { text: 'Files', reference: '', component: 'Input' },
  ],
}

export default form
