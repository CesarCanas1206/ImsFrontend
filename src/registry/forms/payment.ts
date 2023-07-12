const form = {
  id: 'a518d27e-3c87-44e1-a2c4-4f32e0a73797',
  name: 'Payment form',
  reference: 'payment',

  description: 'Payment form',
  endpoint: 'collection',
  questions: [
    { text: 'Signature', reference: 'signature', component: 'Signature' },
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Email', reference: 'email', component: 'Input' },
    { text: 'Total amount', reference: 'total', component: 'Input' },
    {
      text: 'Payment details',
      reference: 'payment',
      component: 'CreditCard',
    },
  ],
}

export default form
