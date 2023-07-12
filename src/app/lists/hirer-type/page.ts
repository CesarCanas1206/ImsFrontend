const page = {
  id: 'a4a4de70-64a5-11ed-9022-0242ac120002',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/hirer-type',
  name: 'Hirer type',
  module: 'booking',
  icon: 'user',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/hirer-type',
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
                  component: 'ModalButtonForm',
                  icon: 'edit',
                  formId: 'hirer-type',
                  itemId: '{id}',
                },
                { component: 'DeleteButton' },
              ],
            },
          ],
        },
      ],
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/hirer-type',
          presets: [
            {
              name: 'Winter',
            },
            {
              name: 'Summer',
            },
            {
              name: 'Lease',
            },
            {
              name: 'Casual',
            },
            {
              name: 'Community',
            },
            {
              name: 'Commercial',
            },
            {
              name: 'Fitness',
            },
            {
              name: 'Internal',
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButton',
          icon: 'plus',
          text: 'Add new',
          sub: [{ component: 'Form', formId: 'hirer-type' }],
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page
