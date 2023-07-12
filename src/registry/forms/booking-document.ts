const form = {
  id: '39aef5ff-9987-43eb-8d0d-d1c700156582',
  name: 'Booking document',
  reference: 'booking-document',
  description: 'Booking document form',
  endpoint: 'd/booking-document',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    {
      text: 'Type',
      reference: 'type',
      component: 'Radios',
      props: {
        data: [
          { label: 'Seasonal T&Cs', value: 'seasonal_terms' },
          { label: 'Terms and conditions', value: 'terms' },
        ],
      },
    },
    { text: 'File', reference: 'file', component: 'FileDoc' },
  ],
}

export default form
