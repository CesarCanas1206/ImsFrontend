const form = {
  id: '434ad907-a64d-47ce-95a1-89e93bef48f3',
  name: 'Asset question form',
  reference: 'asset-question',

  description: 'Asset question form',
  endpoint: 'd/asset-question',
  questions: [
    { text: 'Question/text', reference: 'label', component: 'Input' },
    {
      text: 'Response type',
      reference: 'type',
      component: 'ComponentSelector',
    },
    { text: 'Reference', reference: 'reference', component: 'Input' },
    { text: 'Order', reference: 'question_order', component: 'Input' },
    { text: 'Props', reference: 'props', component: 'Json' },
    { text: 'Form props', reference: 'form_props', component: 'Json' },
  ],
}

export default form
