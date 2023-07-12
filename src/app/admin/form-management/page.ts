const page = {
  id: 'a4a4d1fa-64a5-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  ims: true,
  path: 'admin/form-management',
  name: 'Forms / checklists',
  icon: 'checklist',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'form',
      columns: [
        { name: 'Form', key: 'name' },
        { name: 'Description', key: 'description' },
        { name: 'Reference', key: 'reference', featured: true, title: true },
        { name: 'Category', key: 'category', badge: true, title: true },
        {
          name: 'Actions',
          key: 'actions',
          width: '200px',
          right: 'true',
          components: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'Button',
                  icon: 'sub',
                  compact: 'true',
                  link: '/admin/form-management/questions/{id}',
                },
                {
                  component: 'ModalButton',
                  icon: 'edit',
                  compact: 'true',
                  hideclose: 'true',
                  sub: [
                    {
                      component: 'FormDetail',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'ModalButton',
                  icon: 'search',
                  tooltip: 'Preview form',
                  compact: 'true',
                  sub: [
                    {
                      component: 'Form',
                      formId: '{row.reference}',
                      hideSave: true,
                    },
                  ],
                },
                {
                  component: 'Confirm',
                  title: 'Are you sure you want to delete this?',
                  variant: 'danger',
                  compact: 'true',
                  icon: 'delete',
                  sub: [
                    {
                      component: 'Action',
                      action: 'delete',
                      props: { endpoint: 'form/{id}' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      filters: [
        {
          key: 'category',
          label: 'Type',
          options: [
            {
              label: 'Admin',
              value: 'admin',
              conditions: [{ on: 'category', value: 'admin' }],
            },
            {
              label: 'Allocation',
              value: 'allocation',
              conditions: [{ on: 'category', value: 'allocation' }],
            },
            {
              label: 'Booking',
              value: 'booking',
              conditions: [{ on: 'category', value: 'booking' }],
            },
            {
              label: 'Casual',
              value: 'casual',
              conditions: [{ on: 'category', value: 'casual' }],
            },
            {
              label: 'Checklist',
              value: 'checklist',
              conditions: [{ on: 'category', value: 'checklist' }],
            },
          ],
        },
      ],
      titleSub: [
        {
          component: 'ModalButton',
          text: 'Add form',
          icon: 'plus',
          sub: [
            {
              component: 'FormDetail',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
      sorting: [
        { name: 'Name (A-Z)', key: 'name' },
        { name: 'Name (Z-A)', key: 'name,desc' },
        { name: 'Category (A-Z)', key: 'category' },
        { name: 'Category (Z-A)', key: 'category,desc' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 2,
}

export default page
