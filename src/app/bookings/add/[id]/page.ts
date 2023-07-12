const page = {
  id: '35b8b6ee-0673-4439-9d8d-f8c5e5d41033',
  path: 'bookings/add/:param_id',
  name: 'Add new booking',
  icon: 'calendar',
  components: [
    {
      component: 'Group',
      position: 'apart',
      sub: [
        {
          component: 'BackButton',
        },
      ],
    },
    {
      component: 'Space',
      h: 'sm',
    },
    {
      component: 'Form',
      formId: 'new-booking-list',
      readOnly: true,
    },
  ],
  show: 0,
  order: 6,
}

export default page
