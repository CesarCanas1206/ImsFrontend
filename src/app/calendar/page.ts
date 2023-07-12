const page = {
  id: '709baa3c-64a5-11ed-9022-0242ac120002',
  parent_id: '0',
  path: 'calendar',
  name: 'Calendar',
  icon: 'calendar',
  module: 'calendar',
  hideTitle: true,
  components: [
    {
      component: 'Calendar',
      props: {
        defaultFormat: {
          component: 'ModalButton',
          text: '{start_time} {title}',
          icon: 'clock',
          variant: 'success',
          sub: [
            {
              component: 'Form',
              formId: 'calendar',
              itemId: '{id}',
            },
          ],
        },
      },
    },
  ],
  permission: 'calendar',
  show: 2,
  category: 'admin',
}

export default page
