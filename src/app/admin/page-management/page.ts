const page = {
  id: '31708ec2-64a5-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/page-management',
  name: 'Pages',
  ims: true,
  icon: 'page',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'page',
      columns: [
        { name: 'Name', key: 'name' },
        { name: 'Path', key: 'path' },
        { name: 'Category', key: 'category' },
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
                      formId: 'page',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'Confirm',
                  title: 'Are you sure you want to delete this page?',
                  tooltip: 'Delete',
                  variant: 'danger',
                  icon: 'delete',
                  sub: [
                    {
                      component: 'Action',
                      props: {
                        action: 'delete',
                        endpoint: 'page/{id}',
                      },
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
              formId: 'page',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
      sorting: [
        {
          name: 'Name (A-Z)',
          key: 'name,asc',
        },
        {
          name: 'Name (Z-A)',
          key: 'name,desc',
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 5,
}

export default page
