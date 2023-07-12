const form = {
  id: 'af989dd7-438e-4422-9493-267eb96e8252',
  name: 'Compliance - Not compliant',
  reference: 'compliance-details',
  endpoint: 'd/compliance-details',
  form_props: { questionWidth: 4, answerWidth: 8, required: false },
  questions: [
    {
      text: 'Urgent issue?',
      reference: 'urgent',
      component: 'Switch',
      question_order: '1',
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Issue',
      reference: 'issue',
      component: 'Textarea',
      props: {
        placeholder: 'Describe the issue',
      },
      question_order: '2',
      form_props: { conditions: [{ on: 'type', value: 'NC' }] },
    },
    {
      text: 'Action to be taken',
      reference: 'action',
      component: 'Textarea',
      props: {
        placeholder: 'Describe the action to be taken',
      },
      question_order: '3',
      form_props: { conditions: [{ on: 'type', value: 'NC' }] },
    },
    {
      text: 'Complete by',
      reference: 'due_date',
      component: 'Date',
      props: { minDate: 'today' },
      question_order: '4',
      form_props: { conditions: [{ on: 'type', value: 'NC' }] },
    },
    {
      text: 'Responsibility to fix',
      reference: 'responsibility_by',
      component: 'Select',
      question_order: '5',
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],

        required: false,
      },
    },
    {
      text: 'Comments',
      reference: 'comment',
      component: 'Textarea',
      props: {
        placeholder: 'Enter comments',
      },
      question_order: '6',
      form_props: {
        conditions: [{ on: 'type', value: 'CC' }],
        questionWidth: 12,
        answerWidth: 12,
      },
    },
    {
      reference: 'photo',
      component: 'Camera',
      question_order: '7',
      props: { multiple: true },
      form_props: { required: false },
    },
  ],
}

export default form
