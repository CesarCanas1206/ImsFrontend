const form = {
  id: 'd4befcfd-fd35-4794-b6e7-4c8f8a15cdb8',
  name: 'Office bearers',
  reference: 'office-bearer',
  endpoint: 'd/office-bearer',
  questions: [
    {
      text: 'Role',
      reference: 'role',
      component: 'MultiSelect',
      form_props: { required: true },
      props: {
        required: true,
        options: [
          { label: 'President', value: 'President' },
          { label: 'Vice President', value: 'Vice President' },
          { label: 'Treasurer', value: 'Treasurer' },
          { label: 'Secretary', value: 'Secretary' },
          { label: 'General Committee', value: 'General Committee' },
        ],
      },
    },
    {
      text: 'First name',
      reference: 'first_name',
      component: 'Input',
      props: { placeholder: 'E.g. John' },
    },
    {
      text: 'Last name',
      reference: 'last_name',
      component: 'Input',
      props: { placeholder: 'E.g. Smith' },
    },
    {
      text: 'Contact number',
      reference: 'phone',
      component: 'Input',
    },
    {
      text: 'Email',
      reference: 'email',
      component: 'Input',
      props: { placeholder: 'E.g. john.smith@gmail.com' },
    },
    { text: 'Liaison', reference: 'liaison', component: 'Checkbox' },
    { text: 'Booking contact', reference: 'contact', component: 'Checkbox' },
    { text: 'Application', reference: 'application_id', component: 'Hidden' },
  ],
}

export default form
