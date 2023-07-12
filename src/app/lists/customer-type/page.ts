const page = {
  id: 'b096b02e-01a8-49b0-a2f7-c3fbdf0329c3',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/customer-type',
  name: 'Customer type',
  show: 2,
  icon: 'user',
  components: [
    {
      component: 'Group',
      sub: [
        { component: 'BackButton' },
        {
          component: 'ModalButtonForm',
          text: 'Add customer type',
          icon: 'plus',
          formId: 'customer-type',
        },

        { component: 'Space', h: 'sm', w: null },
      ],
    },
    {
      component: 'DataGrid',
      props: {
        endpoint: 'd/customer-type',
        columns: [
          { name: 'Customer type', key: 'name', feature: true },
          {
            name: 'Actions',
            key: 'action',
            components: [
              {
                component: 'Group',
                compact: true,
                sub: [
                  {
                    component: 'ModalButtonForm',
                    icon: 'edit',
                    formId: 'customer-type',
                    itemId: '{id}',
                    autosave: 'true',
                  },
                  {
                    component: 'DeleteButton',
                  },
                ],
              },
            ],
          },
        ],
        no_results: [
          {
            component: 'AddDefault',
            endpoint: 'd/customer-type',
            presets: [
              {
                name: 'Individual',
              },
              {
                name: 'Commercial organisation',
              },
              {
                name: 'Non-commercial group or organisation',
              },
              {
                name: 'Senior citizen',
              },
              {
                name: 'Internal',
              },
            ],
          },
        ],
      },
    },
  ],
  permission: 'dashboard',
  module: 'booking',
  category: 'admin',
}

export default page
