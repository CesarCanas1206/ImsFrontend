const form = {
  id: 'f904e959-6ed2-47fd-9603-2b020300f7af',
  name: 'Permission',
  reference: 'permission',
  category: 'admin',

  endpoint: 'permission',
  questions: [
    { text: 'Category', reference: 'category', component: 'Input' },
    { text: 'Enabled', reference: 'enabled', component: 'Switch' },
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Code', reference: 'code', component: 'Input' },
  ],
}

export default form
