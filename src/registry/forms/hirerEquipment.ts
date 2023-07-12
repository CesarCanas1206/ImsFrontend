const form = {
  id: 'eed2e394-8abd-46b2-8f81-28819924391e',
  name: 'Hirer equipment',
  reference: 'hirer-equipment',
  description: 'Hirer/equipment form',
  endpoint: 'd/equipment',
  questions: [
    {
      text: 'Equipment',
      reference: 'equipment_id',
      component: 'Select',
      props: {
        endpoint: 'd/equipment',
      },
      form_props: {
        conditions: [{ on: 'type', value: 'hirer' }],
      },
    },
    {
      text: 'Hirer',
      reference: 'hirer_id',
      component: 'Select',
      props: { endpoint: 'hirer?sort_by=name' },
      form_props: {
        conditions: [{ on: 'type', type: '!=', value: 'hirer' }],
      },
    },
  ],
}

export default form
