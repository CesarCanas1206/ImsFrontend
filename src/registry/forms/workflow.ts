const form = {
  id: '044d6cb6-7cfe-4d1c-9f46-06c9c09a12b4',
  name: 'Workflow',
  reference: 'workflow',

  endpoint: 'd/workflow',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    {
      text: 'Steps',
      reference: '',
      component: 'DataGrid',
      props: { endpoint: 'd/workflow-step?parent_id={id}' },
    },
    {
      text: 'Form',
      reference: '',
      component: 'Form',
      props: { formId: 'workflow-step', parent_id: '{id}', itemId: '' },
    },
  ],
}

export default form
