const form = {
  id: 'bdfac855-f0b7-423a-8671-247617041d90',
  name: 'Question form',
  reference: 'form-question',

  description: 'Question form',
  endpoint: 'form-question',
  questions: [
    { text: 'Question/text', reference: 'text', component: 'Input' },
    {
      text: 'Response type',
      reference: 'component',
      component: 'ComponentSelector',
    },
    { text: 'Reference', reference: 'reference', component: 'Input' },
    {
      text: 'Form',
      reference: 'form_id',
      component: 'Hidden',
      props: { default: '{form_id}' },
    },
    { text: 'Order', reference: 'question_order', component: 'Input' },
    { text: 'Props', reference: 'props', component: 'Json' },
    {
      text: 'Parent id',
      reference: 'parent_id',
      component: 'QuestionSelector',
    },
    {
      text: 'Component',
      reference: 'component',
      component: 'Input',
      props: { readOnly: true },
    },
    {
      text: 'Form props',
      reference: 'form_props',
      component: 'FormProps',
      form_props: { question_width: 12, answer_width: 12 },
    },
  ],
}

export default form
