const form = {
  id: '8463903c-282b-485d-bb11-dfea82e9b483',
  name: 'Pricing',
  reference: 'pricing',
  description: 'Pricing to be applied to asset types or assets',
  endpoint: 'd/pricing',
  questions: [
    {
      text: 'Name',
      reference: 'name',
      component: 'Input',
      form_props: { required: true },
    },
    // { text: 'Once off amount', reference: 'fee', component: 'Input' },
    // { text: 'Condition', reference: 'condition', component: 'Input' },
    {
      text: 'Rates',
      reference: 'rates',
      component: 'PricingGrid',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
  ],
}

export default form
