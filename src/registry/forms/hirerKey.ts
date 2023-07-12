const form = {
  id: 'dbe7bec1-a46d-442b-b4db-abc5468f48c8',
  name: 'Hirer key',
  reference: 'hirer-key',
  description: 'Hirer/key form',
  endpoint: 'd/key-register',
  questions: [
    // {
    //   text: 'Key',
    //   reference: 'key-register_id',
    //   component: 'Select',
    //   props: {
    //     endpoint: 'd/key-register',
    //     searchable: true,
    //   },
    //   form_props: {
    //     conditions: [{ on: 'type', value: 'hirer' }],
    //   },
    // },
    {
      text: 'Hirer',
      reference: 'hirer_id',
      component: 'Select',
      props: { endpoint: 'hirer?sort_by=name', searchable: true },
      form_props: {
        conditions: [{ on: 'type', type: '!=', value: 'hirer' }],
      },
    },
  ],
}

export default form
