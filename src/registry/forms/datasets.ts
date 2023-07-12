const form = {
  id: '67d26fcd-9b9a-4ed9-baa8-5508d6c68615',
  name: 'Datasets',
  reference: 'dataset',

  description: 'Dataset form',
  endpoint: 'dataset',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Data', reference: 'data', component: 'Json' },
    { text: 'Id', reference: 'id', component: 'ReadOnly' },
    { text: 'Reference', reference: 'slug', component: 'Input' },
  ],
}

export default form
