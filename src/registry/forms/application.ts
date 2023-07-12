const form = {
  id: 'b00833f6-6a09-43dc-96df-b48884a3afb4',
  name: 'Application form',
  reference: 'application',
  category: 'booking',
  description: 'Application form',
  endpoint: 'd/application',
  questions: [
    {
      text: 'User details',
      component: 'Input',
    },
    {
      text: 'Bookings',
      component: 'DataGrid',
      props: { endpoint: 'booking?parent_id=tmp123' },
    },
    {
      id: '123',
      text: 'Add booking',
      component: 'ModalButton',
      props: { text: 'Add new', icon: 'plus' },
    },
    {
      parent_id: '123',
      text: ' Form',
      component: 'Form',
      props: { formId: 'booking' },
    },
  ],
}

export default form
