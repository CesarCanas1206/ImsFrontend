const form = {
  id: 'c8ff2e12-5e0c-4b19-a60a-e8404be231ec',
  name: 'Compliant issue detail',
  reference: 'compliance-issue',
  endpoint: 'd/compliance-details',
  form_props: { questionWidth: 4, answerWidth: 8, required: false },
  questions: [
    {
      text: 'Urgent issue',
      reference: 'urgent',
      component: 'Switch',
      question_order: '2',
      props: { readOnly: true },
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Inspector',
      reference: 'created_by',
      component: 'Input',
      question_order: '3',
      props: { readOnly: true },
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Date lodged',
      reference: 'created_at',
      component: 'Date',
      question_order: '4',
      props: { readOnly: true },
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Issue',
      reference: 'issue',
      component: 'Textarea',
      props: {
        readOnly: true,
        placeholder: 'Describe the issue',
      },
      question_order: '5',
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Action to be taken',
      reference: 'action',
      component: 'Textarea',
      props: {
        readOnly: true,
        placeholder: 'Describe the action to be taken',
      },
      question_order: '6',
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Complete by',
      reference: 'due_date',
      component: 'Date',
      question_order: '7',
      props: { readOnly: true },
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Responsibility to fix',
      reference: 'responsibility_by',
      component: 'Select',
      question_order: '8',
      props: { readOnly: true },
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
      },
    },
    {
      text: 'Inspection photos',
      reference: 'photo',
      component: 'Camera',
      question_order: '9',
      props: { readOnly: true },
      form_props: {
        required: false,
        conditions: [{ on: 'photo', type: '!=', value: 'empty' }],
      },
    },
    {
      text: 'Completion notes',
      reference: 'completion_comment',
      component: 'Textarea',
      props: {
        placeholder: 'Enter completion notes',
      },
      question_order: '10',
      form_props: {
        conditions: [{ on: 'type', value: 'NC' }],
        questionWidth: 12,
        answerWidth: 12,
      },
    },
    {
      text: 'Completion photos',
      reference: 'completion_photo',
      component: 'Camera',
      question_order: '11',
      form_props: { required: false },
    },
  ],
}

export default form
