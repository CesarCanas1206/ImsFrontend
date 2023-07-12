const page = {
  id: '2961ba6f-c74c-45d0-92f3-d69ea58a6cfa',
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  path: 'admin/storage',
  name: 'Storage',
  module: 'allocation',
  icon: 'warehouse',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/storage',
      columns: [
        {
          name: 'Storage listing',
          sub: [
            {
              component: 'Stack',
              sub: [
                {
                  component: 'Storage',
                },
              ],
            },
          ],
        },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          text: 'Add new storage',
          icon: 'plus',
          formId: 'storage',
          itemId: 'new',
          size: 'xl',
        },
      ],
      no_results: [
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No storage found',
        },
      ],
      sorting: [
        { name: 'Hirer (A-Z)', key: 'hirer-storage.hirer.name' },
        { name: 'Hirer (Z-A)', key: 'hirer-storage.hirer.name,desc' },
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
