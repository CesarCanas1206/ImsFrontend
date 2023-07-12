const form = {
  id: '191526e0-51f7-4251-a785-4e455309d9ca',
  name: 'User form',
  reference: 'hirer-user',
  workflow: ['validate.email'],
  description: 'User details form',
  endpoint: 'user',
  questions: [
    {
      text: 'Role',
      reference: 'role_id',
      component: 'Select',
      props: { readOnly: true, endpoint: 'role' },
    },
    {
      text: 'Title',
      reference: 'title',
      component: 'Input',
    },
    {
      text: 'First name',
      reference: 'first_name',
      component: 'Input',
      form_props: { required: true },
    },
    { text: 'Last name', reference: 'last_name', component: 'Input' },
    { text: 'Contact number', reference: 'phone', component: 'Input' },
    {
      text: 'Email address',
      reference: 'email',
      component: 'Input',
      form_props: { required: true },
    },
    {
      text: 'Position',
      reference: 'position',
      component: 'Input',
    },
    { text: 'Password', reference: 'password', component: 'InputPassword' },
  ],
}

export default form
