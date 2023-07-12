const form = {
  id: '1fb961d4-ffe8-4117-9509-33524cac07d1',
  name: 'Email templates',
  reference: 'email-template',

  description: 'Email templates to send to people',
  endpoint: 'd/email-template',
  questions: [
    { text: 'Reference', reference: 'reference', component: 'Input' },
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Subject', reference: 'subject', component: 'Input' },
    { text: 'Body', reference: 'body', component: 'Textarea' },
    {
      text: 'Has a signature',
      reference: 'has_signature',
      component: 'Checkbox',
    },
    {
      text: 'Signature',
      reference: 'signature',
      component: 'Textarea',
      form_props: { condition: { on: 'has_signature', type: '!empty' } },
    },
  ],
}

export default form
