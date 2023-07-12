const form = {
  id: 'f9ff6195-b58e-4c03-88a9-5d52a29fe648',
  name: 'Asset type',
  reference: 'asset-type',

  description: 'Asset type form',
  endpoint: 'd/asset-type',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Sub type', reference: 'sub-type', component: 'Input' },
    { text: 'Has capacity', reference: 'has_capacity', component: 'Input' },
    {
      text: 'Default pricing',
      reference: 'pricing_id',
      component: 'MultiSelect',
      props: { endpoint: 'd/pricing?sort_by=name' },
    },
  ],
}

export default form
