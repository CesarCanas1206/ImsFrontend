const page = {
  id: '2a35ed71-9034-4df1-8a78-fa9a966218ea',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/booking-category',
  name: 'Booking categories',
  module: 'booking',
  icon: 'calendar',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/booking-category',
      columns: [
        // { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
        {
          name: 'Actions',
          key: 'action',
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButton',
                  icon: 'edit',
                  sub: [
                    {
                      component: 'Form',
                      formId: 'booking-category',
                      itemId: '{id}',
                    },
                  ],
                },
                { component: 'DeleteButton' },
              ],
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButton',
          icon: 'plus',
          text: 'Add new',
          sub: [
            {
              component: 'Form',
              formId: 'booking-category',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  show: 0,
  category: 'booking',
  order: 22,
}

export default page
