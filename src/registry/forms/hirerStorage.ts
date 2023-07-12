const form = {
  id: 'c8e47173-0253-459f-bf96-aff3f7b8cc15',
  name: 'Hirer storage',
  reference: 'hirer-storage',
  description: 'Hirer/storage form',
  endpoint: 'd/storage',
  questions: [
    {
      text: 'Storage',
      reference: 'storage_id',
      component: 'Select',
      props: {
        endpoint: 'd/storage',
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
