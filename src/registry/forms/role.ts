const form = {
  id: '5c68a758-c530-41f5-abfe-fd2a3f867a6c',
  name: 'Role',
  reference: 'role',
  category: 'admin',

  endpoint: 'role',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    { text: 'Access level', reference: 'access_level', component: 'Input' },
    {
      text: 'Default page',
      reference: 'default_page_id',
      component: 'Input',
    },
    {
      text: 'Permissions',
      reference: 'permissions',
      component: 'Checkboxes',
      props: { endpoint: 'permission', value_key: 'code' },
    },
    { text: 'Enabled', reference: 'enabled', component: 'Switch' },
  ],
}

export default form
