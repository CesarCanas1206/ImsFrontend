const form = {
  id: 'c2b07bba-269f-4502-96f0-94a5665554db',
  name: 'Page',
  reference: 'page',
  description: 'Page management',
  endpoint: 'page',
  questions: [
    { text: 'Page name', reference: 'name', component: 'Input' },
    { text: 'Path', reference: 'path', component: 'Input' },
    { text: 'Parent id', reference: 'parent_id', component: 'Input' },
    { text: 'Category', reference: 'category', component: 'Input' },
    { text: 'Icon', reference: 'icon', component: 'Input' },
    { text: 'Permissions', reference: 'permission', component: 'Input' },
    { text: 'Module', reference: 'module', component: 'Input' },
    { text: 'Order', reference: 'order', component: 'Input' },
    {
      text: 'Show on menu',
      reference: 'show',
      component: 'Radios',
      props: {
        options: [
          { label: 'Hidden', value: '0' },
          { label: 'Top', value: '1' },
          { label: 'Side', value: '2' },
        ],
      },
    },
  ],
}

export default form
