const page = {
  id: 'cf29e4b5-46aa-4811-b251-2d450a7603d6',
  path: 'bookings/add',
  name: 'Add new',
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
