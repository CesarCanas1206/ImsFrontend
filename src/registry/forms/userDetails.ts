const form = {
  id: 'd8be9d42-30ea-49e0-ad45-395a6508457d',
  name: 'User details',
  reference: 'user-details',
  category: 'user',
  workflow: ['validate.email'],
  description: "User's own details form",
  endpoint: 'user',
  questions: [
    { text: 'First name', reference: 'first_name', component: 'Input' },
    { text: 'Last name', reference: 'last_name', component: 'Input' },
    { text: 'Phone number', reference: 'phone', component: 'Input' },
    { text: 'Email address', reference: 'email', component: 'Input' },
    { text: 'Password', reference: 'password', component: 'InputPassword' },
  ],
}

export default form
