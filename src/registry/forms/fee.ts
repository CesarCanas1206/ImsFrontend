const form = {
  id: '6c308e23-c26c-4252-a2db-a28f743bb2a0',
  name: 'Fee',
  reference: 'fee',
  description: 'Fee form',
  endpoint: 'fee',
  questions: [
    {
      text: 'Name',
      reference: 'name',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'Rate',
      reference: 'rate',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'Unit',
      reference: 'unit',
      component: 'Input',
      form_props: { required: true },
    },
  ],
}

export default form
