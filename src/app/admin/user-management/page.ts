const page = {
  id: 'a4a4cfca-64a5-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/user-management',
  name: 'Users',
  icon: 'user',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'user',
      columns: [
        { name: 'Name', key: '{first_name} {last_name}', feature: true },
        { name: 'Email address', key: 'email' },
        { name: 'Access level', key: 'role.name', badge: true },
        {
          name: 'Last login',
          key: '{dateTime::last_login}',
          title: true,
        },
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
                  tooltip: 'Edit user',
                  formId: 'user',
                  itemId: '{id}',
                },
                // {
                //   component: 'ModalButton',
                //   icon: 'Building',
                //   tooltip: 'Linked venues',
                //   light: true,
                //   sub: [{ component: 'UserLink', id: '{id}' }],
                // },
                // {
                //   component: 'ModalButton',
                //   icon: 'mail',
                //   tooltip: 'Linked emails',
                //   light: true,
                //   sub: [
                //     {
                //       component: 'UserLinkEmail',
                //       id: '{id}',
                //       type: 'email',
                //       endpoint: 'user-email',
                //       field: 'email_id',
                //     },
                //   ],
                // },
                // {
                //   component: 'ModalButton',
                //   icon: 'lock',
                //   tooltip: 'Linked permission',
                //   light: true,
                //   sub: [
                //     {
                //       component: 'UserLinkPermission',
                //       id: '{id}',
                //       type: 'permission',
                //       endpoint: 'user-permission',
                //       field: 'permission_id',
                //     },
                //   ],
                // },
                {
                  component: 'UserSendPassword',
                },
                // {
                //   component: 'Confirm',
                //   title:
                //     'Are you sure you want to send the user the account information email?',
                //   tooltip: 'Send account activation email',
                //   variant: 'info',
                //   icon: 'send',
                //   light: true,
                //   sub: [
                //     {
                //       component: 'SendEmail',
                //       template: 'user',
                //       data: {
                //         template: 'user',
                //         replace: {
                //           name: '{first_name}',
                //           email: '{email}',
                //           asset: 'asset',
                //           content: '',
                //         },
                //       },
                //     },
                //   ],
                // },
                {
                  component: 'Confirm',
                  title: 'Are you sure you want to delete this?',
                  tooltip: 'Delete',
                  variant: 'danger',
                  light: true,
                  icon: 'delete',
                  sub: [
                    {
                      component: 'Action',
                      action: 'delete',
                      props: { endpoint: 'user/{id}' },
                    },
                  ],
                },
                {
                  component: 'ActionMenu',
                  tooltip: 'More actions',
                  actions: [
                    {
                      text: 'Linked venues',
                      modal: true,
                      icon: 'Building',
                      sub: [{ component: 'UserLink', id: '{id}' }],
                    },
                    {
                      text: 'Linked emails',
                      modal: true,
                      icon: 'mail',
                      sub: [
                        {
                          component: 'UserLinkEmail',
                          id: '{id}',
                          type: 'email',
                          endpoint: 'user-email',
                          field: 'email_id',
                        },
                      ],
                    },
                    {
                      text: 'Linked permission',
                      modal: true,
                      icon: 'lock',
                      sub: [
                        {
                          component: 'UserLinkPermission',
                          id: '{id}',
                          type: 'permission',
                          endpoint: 'user-permission',
                          field: 'permission_id',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      sorting: [
        {
          name: 'Name (A-Z)',
          key: 'first_name',
        },
        {
          name: 'Name (Z-A)',
          key: 'first_name,desc',
        },
        {
          name: 'Email address (A-Z)',
          key: 'email',
        },
        {
          name: 'Email address (Z-A)',
          key: 'email,desc',
        },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          text: 'Add new user',
          icon: 'plus',
          formId: 'user',
          itemId: 'new',
        },
      ],
      filters: [
        {
          key: 'role',
          label: 'Roles',
          endpoint: 'role?enabled=1',
          column: 'name',
          conditions: [{ on: 'role_id', value: 'id' }],
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 3,
}

export default page
