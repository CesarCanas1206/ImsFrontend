const page = {
  id: '673dbcaa-5df7-43fc-bb99-cd7f84853628',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  name: 'Bond refund',
  path: 'bookings/bond-refund',
  permission: 'dashboard',
  module: 'booking',
  category: 'booking',
  icon: 'dollar',
  show: 2,
  order: 50,
  components: [
    {
      component: 'StandardListingPageSingle',
      props: { endpoint: 'd/bond-refund', form: 'bond-refund' },
    },
  ],
}

export default page
