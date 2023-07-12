const page = {
  id: '4db19970-16a6-4961-9599-121f8ef6f1d8',
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  path: 'admin/equipment',
  name: 'Equipment',
  module: 'allocation',
  icon: 'equipment',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/equipment',
      columns: [
        {
          name: 'Equipment listing',
          sub: [
            {
              component: 'Stack',
              sub: [
                {
                  component: 'Equipment',
                },
              ],
            },
          ],
        },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          text: 'Add new equipment',
          icon: 'plus',
          formId: 'equipment',
          itemId: 'new',
          size: 'xl',
        },
      ],
      no_results: [
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No equipment found',
        },
      ],
      sorting: [
        { name: 'Hirer (A-Z)', key: 'hirer-equipment.hirer.name' },
        { name: 'Hirer (Z-A)', key: 'hirer-equipment.hirer.name,desc' },
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
