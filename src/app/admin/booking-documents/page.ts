const page: object = {
  id: 'a585b2b1-66d5-4006-af7c-d062d7b37bc0',
  path: 'admin/booking-documents',
  name: 'Booking documents',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/booking-document',
      columns: [
        {
          name: 'Name',
          key: 'name',
        },
        {
          name: 'Type',
          key: 'type',
          title: true,
        },
        {
          name: 'Actions',
          key: 'actions',
          sub: [
            {
              component: 'ModalButtonForm',
              tooltip: 'Edit document',
              icon: 'edit',
              formId: 'booking-document',
              itemId: '{id}',
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButtonForm',
          icon: 'plus',
          text: 'Add new',
          formId: 'booking-document',
        },
      ],
    },
  ],
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  show: 2,
  order: 0,
  category: 'admin',
  permission: 'admin',
}

export default page
