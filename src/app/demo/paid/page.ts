const page = {
  id: 'eba0efb3-3034-44e1-aec6-363184febe8a',
  path: 'demo/paid',
  name: 'Invoice paid',
  icon: 'event',
  module: 'booking',
  components: [
    {
      component: 'Alert',
      icon: 'Info',
      color: 'green',
      text: 'The invoice #3 has been paid!',
      sub: ['You will receive an email with a copy of the payment details.'],
    },
    {
      component: 'Space',
      h: 'xl',
    },
    {
      component: 'Button',
      icon: 'Back',
      text: 'Go back to dashboard',
      link: '/dashboard',
    },
  ],
  show: 0,
  order: 3,
  public: 1,
  hideSideBar: true,
}

export default page
