const form = {
  id: 'cbc1a6d7-e0c5-41a2-be9d-3f3ea6158520',
  name: 'Add new booking list',
  reference: 'new-booking-list',
  questions: [
    // {
    //   component: 'Button',
    //   props: {
    //     text: 'Event',
    //     fullWidth: true,
    //     link: '/application/calendar/new',
    //   },

    //   form_props: {
    //     question_width: 0,
    //     answer_width: 12,
    //   },
    // },
    // {
    //   component: 'Button',
    //   props: {
    //     text: 'Booking',
    //     fullWidth: true,
    //     link: '/application/booking/new',
    //   },

    //   form_props: {
    //     question_width: 0,
    //     answer_width: 12,
    //   },
    // },
    // {
    //   component: 'NewFormButton',
    //   props: {
    //     text: 'School booking',
    //     fullWidth: true,
    //     formId: 'school',
    //     endpoint: 'd/casual',
    //     parent_id: '{param_id}',
    //     data: {
    //       hirer_id: '{param_id}',
    //     },
    //   },
    // },
    {
      component: 'NewFormButton',
      props: {
        text: 'Casual booking',
        fullWidth: true,
        formId: 'casual',
        endpoint: 'booking',
        parent_id: '{param_id}',
        data: {
          hirer_id: '{param_id}',
        },
      },
    },
    {
      component: 'NewFormButton',
      props: {
        text: 'Trainer booking',
        fullWidth: true,
        formId: 'trainer',
        endpoint: 'booking',
        parent_id: '{param_id}',
        data: {
          hirer_id: '{param_id}',
        },
      },
    },
    // {
    //   component: 'Button',
    //   props: {
    //     text: 'Public holiday',
    //     fullWidth: true,
    //     link: '/application/public-holiday/new',
    //   },

    //   form_props: {
    //     question_width: 0,
    //     answer_width: 12,
    //   },
    // },
    // {
    //   component: 'Button',
    //   props: {
    //     text: 'Venue closure',
    //     fullWidth: true,
    //     link: '/application/closure/new',
    //   },

    //   form_props: {
    //     question_width: 0,
    //     answer_width: 12,
    //   },
    // },
  ],
}

export default form
