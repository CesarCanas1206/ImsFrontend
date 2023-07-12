const page = {
  id: 'f979a7e2-64a4-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/invoice-management',
  name: 'Invoices',
  module: 'booking',
  icon: 'dollar',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/invoice',
      card_grid: 'true',
      columns: [
        { name: 'Invoice number', key: 'Invoice #{number}', feature: true },
        { name: 'Date', key: 'date::date', title: true },
        { name: 'Name', key: 'name', title: true },
        { name: 'Items', key: 'e::items.desc', title: true },
        { name: 'Total', key: '${total}', title: true },
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
                  tooltip: 'Edit',
                  formId: 'invoice',
                  itemId: '{id}',
                },
                {
                  component: 'ModalButton',
                  icon: 'search',
                  tooltip: 'View invoice',
                  sub: [
                    {
                      component: 'Invoice',
                      formId: 'invoice',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'DeleteButton',
                  after_action: 'refresh',
                },
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
          formId: 'invoice',
          itemId: 'new',
          defaultValues: { 'ai::number': '' },
        },
        { component: 'Space', h: 'sm' },
      ],
      sorting: [
        { name: 'Date (Oldest - Newest)', key: 'created_at' },
        {
          name: 'Date (Newest - Oldest)',
          key: 'created_at,desc',
          default: true,
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 12,
}

export default page
