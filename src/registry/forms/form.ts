const form = {
  id: 'd24d86c7-2f1a-11ed-91f6-b4a9fc5fdfa8',
  name: 'Form form',
  reference: 'form',
  description: 'Form form',
  endpoint: 'form',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Description', reference: 'description', component: 'Textarea' },
    { text: 'Reference', reference: 'reference', component: 'Input' },
    { text: 'Category', reference: 'category', component: 'Input' },
    { text: 'Endpoint', reference: 'endpoint', component: 'Input' },
    {
      text: 'Privacy',
      reference: 'privacy',
      component: 'Textarea',
      conditions: [{ on: '{category}', type: 'casual' }],
    },
  ],
}

export default form
