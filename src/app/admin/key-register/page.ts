const page = {
  id: '709bac3a-64a5-11ed-9022-0242ac120002',
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  path: 'key-register',
  name: 'Key register',
  module: 'allocation',
  icon: 'key',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'key-register',
      columns: [
        {
          name: 'Key register listing',
          sub: [
            {
              component: 'Stack',
              sub: [
                {
                  component: 'KeyRegister',
                },
              ],
            },
          ],
        },
      ],
      // endpoint: 'd/key-register?join=hirer-key:key-register_id:id',
      // columns: [
      //   { name: 'Hirer', key: '{hirer-key.hirer.name}' },
      //   { name: 'Venue', key: '{asset.name} - {name}' },
      //   {
      //     name: 'Actions',
      //     key: 'action',
      //     sortable: 'false',
      //     sub: [
      //       {
      //         component: 'Group',
      //         sub: [
      //           {
      //             component: 'ModalButtonForm',
      //             compact: true,
      //             icon: 'edit',
      //             formId: 'key-register',
      //             itemId: '{id}',
      //           },
      //           {
      //             component: 'ModalButtonForm',
      //             compact: true,
      //             icon: 'user',
      //             tooltip: 'Assign/unassign hirer',
      //             formId: 'hirer-key',
      //             query: { 'key-register_id': '{id}' },
      //             defaultValues: { 'key-register_id': '{id}' },
      //           },
      //           {
      //             component: 'DeleteButton',
      //             compact: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          text: 'Add new key',
          icon: 'plus',
          formId: 'key-register',
          itemId: 'new',
          size: 'xl',
        },
      ],
      no_results: [
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No keys found',
        },
      ],
      sorting: [
        { name: 'Hirer (A-Z)', key: 'hirer-key.hirer.name' },
        { name: 'Hirer (Z-A)', key: 'hirer-key.hirer.name,desc' },
        { name: 'Venue (A-Z)', key: 'asset.name' },
        { name: 'Venue (Z-A)', key: 'asset.name,desc' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page
