const page = {
  id: '21b34f35-a3c9-441a-aa9f-a43d35c1fdfe',
  path: 'bookings/submitted',
  name: 'Submitted request!',
  icon: 'event',
  module: 'booking',
  components: [
    {
      component: 'Alert',
      icon: 'Info',
      color: 'green',
      text: 'Your booking request has been submitted!',
      sub: [
        'You will receive an email with a copy of the confirmation details.',
      ],
    },
    {
      component: 'Space',
      h: 'xl',
    },
    {
      component: 'Button',
      icon: 'Back',
      text: 'Go back to listing page',
      link: '/bookings',
    },
  ],
  show: 0,
  order: 3,
  public: 1,
  hideSideBar: true,
}

export default page
