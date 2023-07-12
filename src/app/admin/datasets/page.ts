const page = {
  id: '709bafb4-64a5-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/datasets',
  name: 'Datasets',
  module: 'booking',
  ims: true,
  icon: 'database',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'dataset',
        columns: [
          // { name: 'Id', key: 'id' },
          { name: 'Name', key: 'name' },
          { name: 'Reference', key: 'slug' },
          {
            name: 'Actions',
            key: 'actions',
            components: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButton',
                    props: {
                      icon: 'edit',
                      name: 'User roles',
                    },
                    sub: [
                      {
                        component: 'Form',
                        formId: 'dataset',
                        itemId: '{id}',
                      },
                    ],
                  },
                  {
                    component: 'DeleteButton',
                  },
                ],
              },
            ],
          },
        ],
      },
      sub: [
        {
          component: 'ModalButton',
          text: 'Add new dataset',
          position: 'right',
          icon: 'plus',
          sub: [{ component: 'Form', formId: 'dataset' }],
        },
        {
          component: 'Space',
          h: 'sm',
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 18,
}

export default page
