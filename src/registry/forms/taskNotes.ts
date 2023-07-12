const form = {
  id: 'ac90d428-c3b6-4e30-95d1-34edf26bc257',
  name: 'Task notes',
  reference: 'task-notes',

  endpoint: 'd/task-notes',
  questions: [
    {
      text: 'Task',
      reference: 'task_id',
      component: 'Select',
      props: { endpoint: 'd/task' },
    },
    { text: 'Note', reference: 'note', component: 'Textarea' },
  ],
}

export default form
