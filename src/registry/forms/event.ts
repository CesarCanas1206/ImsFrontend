const form = {
  id: '416a233b-888e-4efc-834c-9e34f626fd01',
  name: 'Event',
  reference: 'event',

  description: 'Event',
  endpoint: 'd/event',
  questions: [
    {
      component: 'Heading',
      props: { text: 'Booking' },
      reference: 'booking_heading',
    },
    { text: 'Name', reference: 'name', component: 'Input' },
    {
      text: 'Starts',
      reference: 'start',
      component: 'DateTime',
      props: { minDate: 'today' },
      form_props: { required: true },
    },
    {
      text: 'Ends',
      reference: 'end',
      component: 'DateTime',
      props: { minDate: 'today' },
      form_props: { required: true },
    },
    {
      props: { text: 'Contact details' },
      component: 'FormHeading',
    },
    {
      text: 'Organisation',
      reference: 'organisation',
      component: 'Input',
    },
    {
      text: 'First name',
      reference: 'first_name',
      component: 'Input',
    },
    {
      text: 'Last name',
      reference: 'last_name',
      component: 'Input',
    },
    {
      text: 'Email address',
      reference: 'email',
      component: 'Input',
    },
    {
      text: 'Contact number',
      reference: 'phone',
      component: 'Input',
      form_props: { required: false },
    },
    {
      text: 'Mobile number',
      reference: 'mobile',
      component: 'Input',
    },
    {
      text: 'Description',
      reference: 'comments',
      component: 'Textarea',
    },
  ],
}

export default form
