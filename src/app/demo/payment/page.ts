const page = {
  id: '1955180c-fbac-45d2-91aa-dfd459767ec7',
  path: 'demo/payment',
  name: 'Payment',
  icon: 'event',
  module: 'booking',
  components: [
    // {
    //   component: 'Alert',
    //   text: 'Payment',
    // },
    {
      component: 'Stack',
      sub: [
        {
          component: 'Invoice',
          formId: 'invoice',
          itemId: '8b2f2c68-af04-4db1-86e4-bab1f2399bf8',
          readOnly: true,
        },
        {
          component: 'PayPal',
          price: '135',
        },
      ],
    },
  ],
  show: 0,
  order: 3,
  public: 1,
  hideSideBar: true,
}

export default page
