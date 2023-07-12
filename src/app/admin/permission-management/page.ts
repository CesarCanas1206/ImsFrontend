const page = {
  id: 'f979aa62-64a4-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/permission-management',
  name: 'Permissions',
  ims: true,
  icon: 'security',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'permission',
      columns: [
        // { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Code', key: 'code' },
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
                      formId: 'permission',
                      itemId: '{id}',
                    },
                  ],
                },
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
              formId: 'permission',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
      sorting: [
        { name: 'Name (A-Z)', key: 'name' },
        { name: 'Name (Z-A)', key: 'name,desc' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 14,
}

export default page
