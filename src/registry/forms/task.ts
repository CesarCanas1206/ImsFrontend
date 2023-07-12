const form = {
  id: '644bcd58-4643-47ff-b448-dffc2aa2bde5',
  name: 'Task',
  reference: 'task',

  description: 'Task form',
  endpoint: 'd/task',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Description', reference: 'description', component: 'Textarea' },
    {
      text: 'Status',
      reference: 'status',
      component: 'Radios',
      props: {
        options: [
          { value: 'Todo', label: 'Todo' },
          { value: 'In progress', label: 'In progress' },
          { value: 'Done', label: 'Done' },
        ],
      },
    },
    {
      text: 'Assigned',
      reference: 'user_id',
      component: 'Select',
      props: { endpoint: 'user' },
    },
    { text: 'Due date', reference: 'due-date', component: 'Date' },
    {
      text: 'Task notes',
      reference: '',
      component: 'SubFormTable',
      props: { id: '{id}' },
      form_props: { answerWidth: 12 },
    },
    {
      text: 'What is your favourite colour?',
      reference: 'colour',
      component: 'ColorInput',
      props: { label: 'Testing', placeholder: 'Testing placeholder' },
    },
  ],
}

export default form
