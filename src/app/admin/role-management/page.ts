const page = {
  id: 'f979ae68-64a4-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/role-management',
  name: 'Roles',
  ims: true,
  icon: 'accessibility',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'role',
      columns: [
        // { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Access level', key: 'access_level' },
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
                      formId: 'role',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'ModalButton',
                  key: 'linkemail',
                  icon: 'mail',
                  light: true,
                  tooltip: 'Link Email',
                  sub: [
                    {
                      component: 'RoleLinkEmail',
                      id: '{id}',
                    },
                  ],
                },
                {
                  component: 'ModalButton',
                  key: 'linkpermission',
                  icon: 'lock',
                  light: true,
                  tooltip: 'Link Permission',
                  sub: [
                    {
                      component: 'RoleLinkPermission',
                      id: '{id}',
                    },
                  ],
                },
                {
                  component: 'DeleteButton',
                  props: { endpoint: 'role/{id}' },
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
              formId: 'role',
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
  order: 8,
}

export default page
