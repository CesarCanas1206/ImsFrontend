const page = {
  id: '4ebe7b3e-6793-46d3-a496-035f1920395d',
  path: 'bookings',
  name: 'Bookings',
  icon: 'event',
  module: 'booking',
  components: [
    {
      component: 'BookingList',
      sub: [
        {
          component: 'ModalButton',
          text: 'Check availability and book',
          size: 'lg',
          sub: [
            {
              component: 'Form',
              props: {
                formId: 'casual',
                itemId: '{id}',
              },
            },
          ],
        },
      ],
    },
  ],
  //show: 0,
  order: 3,
  public: 1,
  //hideSideBar: true,
}

export default page
