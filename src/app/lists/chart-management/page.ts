const page = {
  id: '31708468-64a5-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/chart-management',
  name: 'Charts',
  icon: 'chart',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/charts',
      columns: [
        // { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Chart type', key: 'type' },
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
                  formId: 'charts',
                  itemId: '{id}',
                },
                // {
                //   component: 'ModalButtonForm',
                //   icon: 'plus',
                //   formId: 'charts',
                //   parent_id: '{id}',
                //   parentId: '{id}',
                // },
              ],
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButtonForm',
          icon: 'plus',
          text: 'Add new',
          formId: 'charts',
          itemId: 'new',
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 13,
}

export default page
