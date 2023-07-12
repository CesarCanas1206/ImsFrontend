const form = {
  id: '46f7805b-8d3e-46ec-928f-a6a187cc827e',
  name: 'User form',
  reference: 'user',
  description: 'User details form',
  endpoint: 'user',
  questions: [
    {
      text: 'Role',
      reference: 'role_id',
      component: 'Select',
      props: { endpoint: 'role' },
      form_props: { required: true },
    },
    {
      text: 'First name',
      reference: 'first_name',
      component: 'Input',
      form_props: { required: true },
    },
    { text: 'Last name', reference: 'last_name', component: 'Input' },
    { text: 'Phone number', reference: 'phone', component: 'Input' },
    {
      text: 'Email address',
      reference: 'email',
      component: 'Input',
      form_props: { required: true },
    },
    { text: 'Password', reference: 'password', component: 'InputPassword' },
  ],
}

export default form
